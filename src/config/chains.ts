import type { Chain } from '@rainbow-me/rainbowkit'

export const avalanche: Chain = {
  id: 43_114,
  name: 'Avalanche',
  network: 'avalanche',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/200x200/5805.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
    public: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  testnet: false,
}

export const fuji: Chain = {
  id: 43_113,
  name: 'Fuji',
  network: 'fuji',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/200x200/5805.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: { http: ['https://api.avax-test.network/ext/bc/C/rpc'] },
    public: { http: ['https://api.avax-test.network/ext/bc/C/rpc'] },
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io' },
  },
  testnet: true,
}

export const local: Chain = {
  id: 31337,
  name: 'Local',
  network: 'local',
  iconUrl:
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dota2.com%2Fhero%2Fanti-mage&psig=AOvVaw2UtLD5zXGTNlRjTBKHvsVa&ust=1663961278909000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPDPhPqQqfoCFQAAAAAdAAAAABAD',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    // default: "http://localhost:8545/ext/bc/C/rpc",
    default: { http: ['http://127.0.0.1:8545/ext/bc/C/rpc'] },
    public: { http: ['http://127.0.0.1:8545/ext/bc/C/rpc'] },
  },
  testnet: true,
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io' },
  },
}

export const localanr: Chain = {
  id: 43_112,
  name: 'Local',
  network: 'local',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/200x200/5805.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: { http: ['http://localhost:8545/ext/bc/C/rpc'] },
    public: { http: ['http://localhost:8545/ext/bc/C/rpc'] },
  },
  testnet: true,
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io' },
  },
}

export const anr: Chain = {
  id: 43_112,
  name: 'GGP ANR',
  network: 'anr',
  iconUrl: 'https://i.imgur.com/geY05yg.png',
  iconBackground: '#5d43ef',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: { http: ['https://anr.fly.dev/ext/bc/C/rpc'] },
    public: { http: ['https://anr.fly.dev/ext/bc/C/rpc'] },
  },
  testnet: true,
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io' },
  },
}

const chain = { avalanche, fuji, local, anr }

export default chain
