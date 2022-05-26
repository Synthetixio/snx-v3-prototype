import { ethers } from "ethers";
import { useProvider, useNetwork, erc20ABI } from "wagmi";
import { collateralTypesState } from "../state/index";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Initializer() {
  const provider = useProvider();
  const router = useRouter();
  const { activeChain, switchNetwork } = useNetwork();

  /***** INITIALIZE NETWORK *****/
  const chainOptions = { 1: "mainnet", 42: "kovan", 1337: "localhost" };

  useEffect(() => {
    if (switchNetwork) {
      const web3Provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );

      // On load, switch into the chain specified by the query param
      var searchParams = new URLSearchParams(window.location.search);
      var chain = searchParams.get("chain");
      if (chain) {
        var chainId = Object.entries(chainOptions).find(
          (opt) => opt[1] == chain
        )[0];
        switchNetwork(parseInt(chainId));
      } else {
        switchNetwork(1);
        // TODO: Set to mainnet
      }

      // The provider is the 'source of truth'. When it changes, assign the query parameter accordingly.
      web3Provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          searchParams.set("chain", chainOptions[newNetwork.chainId]);
          router.replace(
            `${window.location.pathname}?${searchParams.toString()}`,
            undefined,
            { shallow: true }
          );
        }
      });

      // After route change, make sure we keep the query param on the URL.
      var searchParams = new URLSearchParams(window.location.search);
      if (!router.query.chain && activeChain) {
        searchParams.set("chain", chainOptions[activeChain.id]);
        router.replace(
          `${window.location.pathname}?${searchParams.toString()}`,
          undefined,
          { shallow: true }
        );
      }
    }
  }, [switchNetwork, router.query]);

  /***** INITIALIZE COLLATERAL TYPES *****/
  const [, setCollateralTypes] = useRecoilState(collateralTypesState);

  useEffect(() => {
    (async () => {
      // TODO: use readContract to get the info below from settings on-chain
      // Icon gets pulled in from tokenlist or something?
      let collateralTypes =
        activeChain?.id == 42
          ? {
              "0x022E292b44B5a146F2e8ee36Ff44D3dd863C915c": {
                ticker: "SNX",
                address: "0x022E292b44B5a146F2e8ee36Ff44D3dd863C915c",
                icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png",
                decimals: 18,
              },
              "0xa36085f69e2889c224210f603d836748e7dc0088": {
                ticker: "LUSD",
                address: "0xa36085f69e2889c224210f603d836748e7dc0088",
                icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x5f98805A4E8be255a32880FDeC7F6728C6568bA0/logo.png",
                decimals: 18,
              },
              "0xe22da380ee6B445bb8273C81944ADEB6E8450422": {
                ticker: "ETH",
                address: "0xe22da380ee6B445bb8273C81944ADEB6E8450422",
                icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
                decimals: 18,
              },
            }
          : {};

      let i = 0;
      for await (const collateralType of Object.entries(collateralTypes)) {
        const erc20 = new ethers.Contract(
          collateralType[1].address,
          erc20ABI,
          provider
        );
        const decimals = await erc20.decimals();
        collateralTypes[collateralType[0]].decimals = decimals;
        i++;
      }
      setCollateralTypes(collateralTypes);
    })();
  }, [activeChain]);

  return null;
}
