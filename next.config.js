/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.clerk.com' },
      { protocol: 'https', hostname: '**.clerk.com' },
      { protocol: 'https', hostname: '**.clerk.dev' },
      { protocol: 'https', hostname: 'frontend-api.clerk.services' },
    ],
  },
};

module.exports = nextConfig;
