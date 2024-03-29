import { BigNumber } from "ethers";
import { chain, chainId as chainMapping } from "wagmi";

export type CollateralType = {
  address: string;
  symbol: string;
  logoURI: string;
  decimals: number;
  targetCRatio?: BigNumber;
  minimumCRatio?: BigNumber;
  price?: BigNumber;
  priceDecimals?: number;
};

// TODO: Retrieve from on chain data
export const localCollateralTypes = (chainId: number) => {
  const chainName = getChainNameById(chainId);
  /*
  Consider injecting token list data here instead of useCollateralTypes.ts

  if (snxContract?.chainId !== LOCALHOST_CHAIN_ID) {
    // Convert addresses to the data from the token list
    const tokensForLocalChain = tokenList.tokens.filter(
      (token) => token.chainId === snxContract?.chainId
    );
    console.log(tokensForLocalChain);
    const enrichedCollateralTypes = data
      .map((collateralType) =>
        tokensForLocalChain.find(
          (token) => token.address === collateralType.address
        )
      )
      .filter(function (element) {
        return element !== undefined;
      }) as Array<CollateralType>;
    setSupportedCollateralTypes(enrichedCollateralTypes);
  }
  */
  return [
    {
      address: require(`../deployments/${chainName}/snx.token.json`).address,
      symbol: "SNX",
      logoURI:
        "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png",
      decimals: 18,
    },
    {
      address: require(`../deployments/${chainName}/lusd.token.json`).address,
      symbol: "LUSD",
      logoURI:
        "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x5f98805A4E8be255a32880FDeC7F6728C6568bA0/logo.png",
      decimals: 18,
    },
    {
      address: require(`../deployments/${chainName}/WETH.json`).address,
      symbol: "ETH",
      logoURI:
        "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      decimals: 18,
    },
  ];
};

export const fundsData: Record<string, { name: string }> = {
  1: {
    name: "Spartan Council",
  },
  0: {
    name: "None",
  },
};

export const supportedChains = [
  chain.goerli,
  {
    ...chain.hardhat,
    multicall: {
      address: "0x2017758D5341a319410f8DdD0a034d0170EE0444",
      blockCreated: 10228837,
    },
  },
];

export const getChainById = (chainId: number) =>
  supportedChains.find(chain => chain.id === chainId);

export const getChainNameById = (chainId: number) => {
  const chain = Object.entries(chainMapping).find(
    entry => entry[1] === chainId
  );

  return chain ? chain[0] : "";
};

export const MAINNET_CHAIN_ID = 1;
export const LOCALHOST_CHAIN_ID = chain.hardhat.id;

export const CONTRACT_SYNTHETIX_PROXY = "synthetix.Proxy";
export const CONTRACT_ACCOUNT = "synthetix.Account";
export const CONTRACT_MULTICALL = "Multicall";
