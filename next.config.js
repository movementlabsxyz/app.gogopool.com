/* eslint-disable no-undef */
module.exports = {
  reactStrictMode: true,
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
