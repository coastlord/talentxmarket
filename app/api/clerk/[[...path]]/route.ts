/**
 * Clerk Proxy Route
 * Forwards all Clerk Frontend API requests through this Next.js route.
 * This eliminates the need for a clerk.talentxmarket.com CNAME DNS record.
 *
 * Key: we must set Host = clerk.talentxmarket.com so Clerk's shared backend
 * (frontend-api.clerk.services) can identify which application to serve.
 */

export const runtime = 'nodejs'; // Pin to Node.js runtime (not Edge)

const CLERK_FRONTEND_API_HOST = 'clerk.talentxmarket.com';
const CLERK_UPSTREAM = 'https://frontend-api.clerk.services';

// Hop-by-hop headers must NOT be forwarded in either direction.
// Forwarding transfer-encoding: chunked in the response causes Next.js 500.
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

    // Strip our /api/clerk prefix to get the Clerk API path
    const clerkPath = pathname.replace(/^\/api\/clerk/, '') || '/';
    const upstreamUrl = `${CLERK_UPSTREAM}${clerkPath}${search}`;

    // Build request headers — forward everything except hop-by-hop and Host,
    // then override Host so the Clerk backend identifies the right app.
    const reqHeaders = new Headers();
    req.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (!HOP_BY_HOP.has(lower) && lower !== 'host') {
        reqHeaders.set(key, value);
      }
    });

    // ← Critical: Clerk's shared backend uses the Host header
    //   to know which application to serve requests for.
    reqHeaders.set('host', CLERK_FRONTEND_API_HOST);

    const hasBody = req.method !== 'GET' && req.method !== 'HEAD';

    const upstream = await fetch(upstreamUrl, {
      method: req.method,
      headers: reqHeaders,
      body: hasBody ? req.body : undefined,
      // @ts-ignore — required for streaming bodies in Node.js
      duplex: hasBody ? 'half' : undefined,
    });

    // Build response headers — strip hop-by-hop headers so Next.js
    // doesn't reject the response (transfer-encoding: chunked causes 500).
    const resHeaders = new Headers();
    upstream.headers.forEach((value, key) => {
      if (!HOP_BY_HOP.has(key.toLowerCase())) {
        resHeaders.set(key, value);
      }
    });

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: resHeaders,
    });
  } catch (err) {
    console.error('[Clerk Proxy] Error:', err);
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
