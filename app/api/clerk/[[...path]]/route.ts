/**
 * Clerk Proxy Route
 * Forwards all Clerk Frontend API requests through this Next.js route.
 * This eliminates the need for a clerk.talentxmarket.com CNAME DNS record.
 *
 * Key: we must set Host = clerk.talentxmarket.com so Clerk's shared backend
 * (frontend-api.clerk.services) can identify which application to serve.
 */

const CLERK_FRONTEND_API_HOST = 'clerk.talentxmarket.com';
const CLERK_UPSTREAM = 'https://frontend-api.clerk.services';

async function handler(req: Request): Promise<Response> {
  const { pathname, search } = new URL(req.url);

  // Strip our /api/clerk prefix to get the Clerk API path
  const clerkPath = pathname.replace(/^\/api\/clerk/, '') || '/';
  const upstreamUrl = `${CLERK_UPSTREAM}${clerkPath}${search}`;

  // Build headers — forward everything except hop-by-hop headers,
  // then override Host so the Clerk backend identifies the right app.
  const headers = new Headers();
  const skipHeaders = new Set([
    'host', 'connection', 'transfer-encoding',
    'keep-alive', 'upgrade', 'te', 'trailers',
  ]);
  req.headers.forEach((value, key) => {
    if (!skipHeaders.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  // ← This is the critical fix: Clerk's shared backend uses the Host header
  //   to know which application to serve requests for.
  headers.set('host', CLERK_FRONTEND_API_HOST);

  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';

  const upstream = await fetch(upstreamUrl, {
    method: req.method,
    headers,
    body: hasBody ? req.body : undefined,
    // @ts-ignore — required for streaming bodies in Node.js
    duplex: hasBody ? 'half' : undefined,
  });

  // Proxy the response back, preserving status and headers
  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: new Headers(upstream.headers),
  });
}

export const GET     = handler;
export const POST    = handler;
export const PUT     = handler;
export const PATCH   = handler;
export const DELETE  = handler;
export const HEAD    = handler;
export const OPTIONS = handler;
