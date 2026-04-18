/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.clerk.com' },
      { protocol: 'https', hostname: '**.clerk.com' },
      { protocol: 'https', hostname: '**.clerk.dev' },
    ],
  },
  async rewrites() {
    return [
      {
        // Proxy Clerk Frontend API through this app — avoids needing clerk.talentxmarket.com CNAME
        source: '/api/clerk/:path*',
        destination: 'https://frontend-api.clerk.services/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
