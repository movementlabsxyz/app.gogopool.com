/* eslint-disable no-undef */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com", "s2.coinmarketcap.com"],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "https://www.gogopool.com",
        permanent: true,
      },
    ];
  },
};
