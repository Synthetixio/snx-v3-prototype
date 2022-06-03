import { chain } from 'wagmi';

export type CollateralType = {
  address: string;
  symbol: string;
  logoURI: string;
  decimals: number;
};

// TODO: Retrieve from on chain data
export const collateralTypes: Array<CollateralType> = [
  {
    address: '0x29c8Ba4dFECBA1E197D3521a6e41476a26C708eA',
    symbol: 'SNX',
    logoURI:
      'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png',
    decimals: 18,
  },
  {
    address: '0xa36085f69e2889c224210f603d836748e7dc0088',
    symbol: 'LUSD',
    logoURI:
      'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x5f98805A4E8be255a32880FDeC7F6728C6568bA0/logo.png',
    decimals: 18,
  },
  {
    address: '0xe22da380ee6B445bb8273C81944ADEB6E8450422',
    symbol: 'ETH',
    logoURI:
      'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
    decimals: 18,
  },
];

export const supportedChains = [chain.mainnet, chain.kovan, chain.localhost];
export const getChainById = (chainId: number) =>
  supportedChains.find(chain => chain.id === chainId);

export const getChainByName = (chainName: string) =>
  supportedChains.find(chain => chain.name === chainName);

export const getChainNameById = (chainId: number) =>
  getChainById(chainId)?.name;

export const MAINNET_CHAIN_ID = 1;
