module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jost: ["Jost"], // since font are self-hosted, can assume to not need backup fonts
        domaine: ["Domaine"],
      },
    },
  },
  plugins: [],
};
