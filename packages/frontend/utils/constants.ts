import { chain } from 'wagmi';

// TODO: Retrieve from on chain data
export const collateralTypes = [
  {
    address: '0x022E292b44B5a146F2e8ee36Ff44D3dd863C915c',
    ticker: 'SNX',
    icon: 'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png',
    decimals: 18,
  },
  {
    address: '0xa36085f69e2889c224210f603d836748e7dc0088',
    ticker: 'LUSD',
    icon: 'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x5f98805A4E8be255a32880FDeC7F6728C6568bA0/logo.png',
    decimals: 18,
  },
  {
    address: '0xe22da380ee6B445bb8273C81944ADEB6E8450422',
    ticker: 'ETH',
    icon: 'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    decimals: 18,
  },
];

export const supportedChains = [chain.mainnet, chain.kovan, chain.localhost];
export const getChainById = (chainId: number) =>
  supportedChains.find(chain => chain.id === chainId);

export const MAINNET_CHAIN_ID = 1;
