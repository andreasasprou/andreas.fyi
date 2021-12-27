/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  optimizeFonts: false,
  productionBrowserSourceMaps: true,
  async rewrites() {
    return [
      {
        source: '/api/og-image/(.+)',
        destination: '/api/og-image',
      },
    ];
  },
  redirects: function () {
    return [
      {
        source: '/engineering/nextjs-auth-skeleton-loaders',
        destination: '/writing/nextjs-auth-skeleton-loaders',
        permanent: true,
      },
      {
        source: '/thinking/early-stage-founder-character',
        destination: '/writing/early-stage-founder-character',
        permanent: true,
      },
    ];
  },
};
