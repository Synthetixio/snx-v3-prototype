import { chain, chainId as chainMapping } from 'wagmi';

export type CollateralType = {
  address: string;
  symbol: string;
  logoURI: string;
  decimals: number;
};

// TODO: Retrieve from on chain data
export const localCollateralTypes: Array<CollateralType> = [
  {
    address: require('../deployments/hardhat/snx.token.json').address,
    symbol: 'SNX',
    logoURI:
      'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png',
    decimals: 18,
  },
  {
    address: require('../deployments/hardhat/lusd.token.json').address,
    symbol: 'LUSD',
    logoURI:
      'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x5f98805A4E8be255a32880FDeC7F6728C6568bA0/logo.png',
    decimals: 18,
  },
  {
    address: require('../deployments/hardhat/WETH.json').address,
    symbol: 'WETH',
    logoURI:
      'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    decimals: 18,
  },
];

export const supportedChains = [chain.mainnet, chain.kovan, chain.hardhat];
export const getChainById = (chainId: number) =>
  supportedChains.find(chain => chain.id === chainId);

export const getChainNameById = (chainId: number) => {
  const chain = Object.entries(chainMapping).find(
    entry => entry[1] === chainId
  );

  return chain ? chain[0] : '';
};

export const MAINNET_CHAIN_ID = 1;
export const LOCALHOST_CHAIN_ID = chain.hardhat.id;
