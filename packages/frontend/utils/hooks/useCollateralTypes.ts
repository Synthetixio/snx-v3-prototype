import { collateralTypesState } from "../../state";
import {
  CollateralType,
  CONTRACT_SYNTHETIX_PROXY,
  localCollateralTypes,
  LOCALHOST_CHAIN_ID,
} from "../constants";
import { getContract, useContract } from "./useContract";
import { useSynthetixRead } from "./useDeploymentRead";
import tokenList from "@uniswap/default-token-list";
import { BigNumber } from "ethers";
import { useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { useContractReads, useProvider } from "wagmi";

type CollateralMetadataType = Array<[string, BigNumber, BigNumber, boolean]>;

type PriceDataType = Array<
  [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] | number
>;

export const useCollateralTypes = () => {
  const [supportedCollateralTypes, setSupportedCollateralTypes] =
    useRecoilState(collateralTypesState);
  const [isLoading, setIsLoading] = useState(true);
  const provider = useProvider();

  const snxContract = useContract(CONTRACT_SYNTHETIX_PROXY);

  // Get this list of collateral types from a network request, use deployments data for now
  // TODO: Rename this function on chain to getCollateralTypesId, getCollateralTypes can return an array of structs and we can skip the calls in the useContractReads call below
  useSynthetixRead({
    functionName: "getCollateralTypes",
    args: true,
    onError(err) {
      // TODO: throw up a toast
      // report to sentry or some other tool
      console.log("ERR", err);
    },
    onSuccess(data) {
      setSupportedCollateralTypes(localCollateralTypes(snxContract!.chainId));
    },
  });

  const getCollateralTypeCalls = supportedCollateralTypes.map(ct => ({
    addressOrName: snxContract!.address,
    contractInterface: snxContract!.abi,
    functionName: "getCollateralTypes",
    args: [true],
  }));

  // This takes the list of supported collateral types from recoil and enriches them with the on-chain about them from the `getCollateralType` function.
  const { data: collateralTypeMetadata } = useContractReads({
    contracts: getCollateralTypeCalls,
    enabled: !!supportedCollateralTypes.length,
    onSuccess: data => {
      setSupportedCollateralTypes(
        supportedCollateralTypes.map((ct, i) => ({
          ...ct,
          targetCRatio: data[i][1],
          minimumCRatio: data[i][2],
        }))
      );
    },
  });

  // This fetches price and price decimal data for the collateral types when the above hook recieves a response
  const priceCalls = useMemo(() => {
    if (!collateralTypeMetadata) {
      return [];
    }

    const latestRoundData = collateralTypeMetadata.map((ct, i) => {
      let symbol = supportedCollateralTypes[i].symbol.toLowerCase();
      if (symbol == "eth") symbol = "weth";
      const aggregatorContract = getContract(
        `aggregator_${symbol}.aggregator`,
        provider,
        snxContract!.chainId
      );
      return {
        addressOrName: aggregatorContract!.address,
        contractInterface: aggregatorContract!.abi,
        functionName: "latestRoundData",
      };
    });

    const priceDecimals = collateralTypeMetadata.map((ct, i) => {
      let symbol = supportedCollateralTypes[i].symbol.toLowerCase();
      if (symbol == "eth") symbol = "weth";
      const aggregatorContract = getContract(
        `aggregator_${symbol}.aggregator`,
        provider,
        snxContract!.chainId
      );
      return {
        addressOrName: aggregatorContract!.address,
        contractInterface: aggregatorContract!.abi,
        functionName: "decimals",
      };
    });

    return [...latestRoundData, ...priceDecimals];
  }, [collateralTypeMetadata, provider, snxContract, supportedCollateralTypes]);

  // After the price data is fetched, set the data in recoil and turn off the loading state.
  useContractReads({
    contracts: priceCalls,
    enabled: !!priceCalls.length,
    onSuccess: data => {
      setIsLoading(false);
      setSupportedCollateralTypes(
        supportedCollateralTypes.map((ct, i) => {
          // wagmi types broken
          // @ts-ignore
          const priceDecimals = data[
            i + supportedCollateralTypes.length
          ] as number;
          // wagmi types broken
          // @ts-ignore
          const priceData = data[i] as number;
          return {
            ...ct,
            price: Array.isArray(priceData) ? priceData[1] : BigNumber.from(0),
            priceDecimals: !Array.isArray(priceDecimals) ? priceDecimals : 0,
          };
        })
      );
    },
  });

  return {
    isLoading,
  };
};
