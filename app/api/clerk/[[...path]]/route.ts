/**
 * Clerk Proxy Route
 * Forwards all Clerk Frontend API requests through this Next.js route.
 * Uses Node.js https module (not fetch) so we can set the Host header freely.
 *
 * Key: we must set Host = clerk.talentxmarket.com so Clerk's shared backend
 * (frontend-api.clerk.services) can identify which application to serve.
 */

import https from 'node:https';

export const runtime = 'nodejs';

const CLERK_FRONTEND_API_HOST = 'clerk.talentxmarket.com';
const CLERK_UPSTREAM_HOSTNAME  = 'frontend-api.clerk.services';

// Hop-by-hop headers must NOT be forwarded in either direction
const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'transfer-encoding',
  'te',
  'trailers',
  'upgrade',
  'proxy-authorization',
  'proxy-authenticate',
]);

async function handler(req: Request): Promise<Response> {
  try {
    const { pathname, search } = new URL(req.url);
    const clerkPath = pathname.replace(/^\/api\/clerk/, '') || '/';
    const upstreamPath = `${clerkPath}${search}`;

    // Build request headers
    const reqHeaders: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (!HOP_BY_HOP.has(lower) && lower !== 'host') {
        reqHeaders[lower] = value;
      }
    });
    // Override Host so Clerk's shared backend identifies the right app
    reqHeaders['host'] = CLERK_FRONTEND_API_HOST;

    // Buffer body for non-GET/HEAD requests
    const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
    let bodyBuf: Buffer | undefined;
    if (hasBody) {
      bodyBuf = Buffer.from(await req.arrayBuffer());
      if (bodyBuf.length > 0) {
        reqHeaders['content-length'] = String(bodyBuf.length);
      }
    }

    // Use https.request for full control — fetch() may refuse to set Host
    return await new Promise<Response>((resolve) => {
      const proxyReq = https.request(
        {
          hostname: CLERK_UPSTREAM_HOSTNAME, // TLS SNI + DNS resolution
          port: 443,
          path: upstreamPath,
          method: req.method,
          headers: reqHeaders,
        },
        (proxyRes) => {
          const chunks: Buffer[] = [];
          proxyRes.on('data', (chunk: Buffer) => chunks.push(chunk));
          proxyRes.on('end', () => {
            const responseBody = Buffer.concat(chunks);

            // Strip hop-by-hop headers from response
            const resHeaders = new Headers();
            for (const [key, val] of Object.entries(proxyRes.headers)) {
              if (HOP_BY_HOP.has(key.toLowerCase()) || val === undefined) continue;
              if (Array.isArray(val)) {
                val.forEach((v) => resHeaders.append(key, v));
              } else {
                resHeaders.set(key, val);
              }
            }

            resolve(
              new Response(responseBody, {
                status: proxyRes.statusCode ?? 200,
                headers: resHeaders,
              }),
            );
          });
          proxyRes.on('error', (err) => {
            console.error('[Clerk Proxy] Response stream error:', err);
            resolve(
              new Response(JSON.stringify({ error: 'Proxy stream error', detail: String(err) }), {
                status: 500,
                headers: { 'content-type': 'application/json' },
              }),
            );
          });
        },
      );

      proxyReq.on('error', (err) => {
        console.error('[Clerk Proxy] Request error:', err);
        resolve(
          new Response(JSON.stringify({ error: 'Proxy request error', detail: String(err) }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
          }),
        );
      });

      if (bodyBuf && bodyBuf.length > 0) {
        proxyReq.write(bodyBuf);
      }
      proxyReq.end();
    });
  } catch (err) {
    console.error('[Clerk Proxy] Unhandled error:', err);
    return new Response(
      JSON.stringify({ error: 'Clerk proxy error', detail: String(err) }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }
}

export const GET     = handler;
export const POST    = handler;
export const PUT     = handler;
export const PATCH   = handler;
export const DELETE  = handler;
export const HEAD    = handler;
export const OPTIONS = handler;
