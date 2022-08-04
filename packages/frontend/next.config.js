/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: '/accounts/:id',
        destination: '/accounts/:id/positions',
        permanent: false
      },
    ]
  },
};

module.exports = nextConfig;
