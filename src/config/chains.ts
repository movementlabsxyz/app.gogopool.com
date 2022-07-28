import type { Chain } from "@rainbow-me/rainbowkit";

export const avalanche: Chain = {
  id: 43_114,
  name: "Avalanche",
  network: "avalanche",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/200x200/5805.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "AVAX",
  },
  rpcUrls: {
    default: "https://api.avax.network/ext/bc/C/rpc",
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://snowtrace.io" },
    etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  testnet: false,
};

export const fuji: Chain = {
  id: 43_113,
  name: "Fuji",
  network: "fuji",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/200x200/5805.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "AVAX",
  },
  rpcUrls: {
    default: "https://api.avax-test.network/ext/bc/C/rpc",
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://testnet.snowtrace.io" },
    etherscan: { name: "SnowTrace", url: "https://testnet.snowtrace.io" },
  },
  testnet: true,
};

export const local: Chain = {
  id: 43_112,
  name: "Local",
  network: "local",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/200x200/5805.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "AVAX",
  },
  rpcUrls: {
    default: "http://localhost:8545/ext/bc/C/rpc",
  },
  testnet: true,
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://testnet.snowtrace.io" },
  },
};

export const anr: Chain = {
  id: 43_112,
  name: "GGP ANR",
  network: "anr",
  iconUrl: "https://avatars.githubusercontent.com/u/99089702",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "AVAX",
  },
  rpcUrls: {
    default: "https://anr.fly.dev/ext/bc/C/rpc",
  },
  testnet: true,
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://testnet.snowtrace.io" },
  },
};

const chain = { avalanche, fuji, local, anr };

export default chain;
