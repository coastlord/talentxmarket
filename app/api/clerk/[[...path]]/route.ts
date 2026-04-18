/**
 * Clerk Proxy Route
 * Forwards all Clerk Frontend API requests through this Next.js route.
 * This eliminates the need for a clerk.talentxmarket.com CNAME DNS record.
 * Configured in Clerk dashboard → Domains → Proxy configuration.
 */

const CLERK_FRONTEND_API = 'https://frontend-api.clerk.services';

async function handler(req: Request): Promise<Response> {
  const { pathname, search } = new URL(req.url);

  // Strip our /api/clerk prefix to get the Clerk API path
  const clerkPath = pathname.replace(/^\/api\/clerk/, '') || '/';
  const clerkUrl = `${CLERK_FRONTEND_API}${clerkPath}${search}`;

  // Forward headers (drop hop-by-hop headers that shouldn't be proxied)
  const headers = new Headers();
  const skipHeaders = new Set(['host', 'connection', 'transfer-encoding', 'keep-alive', 'upgrade']);
  req.headers.forEach((value, key) => {
    if (!skipHeaders.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';

  const upstream = await fetch(clerkUrl, {
    method: req.method,
    headers,
    body: hasBody ? req.body : undefined,
    // Required for streaming request bodies in Node.js fetch
    // @ts-ignore
    duplex: hasBody ? 'half' : undefined,
  });

  // Return the upstream response with its original headers and status
  const responseHeaders = new Headers(upstream.headers);
  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export const GET     = handler;
export const POST    = handler;
export const PUT     = handler;
export const PATCH   = handler;
export const DELETE  = handler;
export const HEAD    = handler;
export const OPTIONS = handler;
