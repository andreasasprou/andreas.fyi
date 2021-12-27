/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  optimizeFonts: false,
  redirects: function () {
    return [
      {
        source: '/engineering/nextjs-auth-skeleton-loaders',
        destination: '/blog/nextjs-auth-skeleton-loaders',
        permanent: true
      },
      {
        source: '/thinking/early-stage-founder-character',
        destination: '/blog/early-stage-founder-character',
        permanent: true
      }
    ]
  }
}
