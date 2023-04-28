/* eslint-disable no-undef */
module.exports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'i.imgur.com', 's2.coinmarketcap.com'],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
}
