import { collateralTypesState } from "../../state";
import {
  CollateralType,
  CONTRACT_SYNTHETIX_PROXY,
  localCollateralTypes,
  LOCALHOST_CHAIN_ID,
} from "../constants";
import { getContract, useContract } from "./useContract";
import { useContractReads } from "./useContractReads";
import { useSynthetixRead } from "./useDeploymentRead";
import tokenList from "@uniswap/default-token-list";
import { BigNumber } from "ethers";
import { useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { useProvider } from "wagmi";

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
  useSynthetixRead("getCollateralTypes", {
    args: [true],
    onError(err) {
      // TODO: throw up a toast
      // report to sentry or some other tool
      console.log("ERR", err);
    },
    onSuccess(data) {
      if (snxContract) {
        setSupportedCollateralTypes(localCollateralTypes(snxContract.chainId));
      }
      /*
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
    },
  });

  // This takes the list of supported collateral types from recoil and enriches them with the on-chain about them from the `getCollateralType` function.
  const { data: collateralTypeMetadata } =
    useContractReads<CollateralMetadataType>(
      supportedCollateralTypes.map((ct) => ({
        contract: snxContract!.contract,
        funcName: "getCollateralType",
        args: [ct.address],
      })),
      {
        enabled: !!supportedCollateralTypes.length,
        onSuccess: (data) => {
          setSupportedCollateralTypes(
            supportedCollateralTypes.map((ct, i) => ({
              ...ct,
              targetCRatio: data[i][1],
              minimumCRatio: data[i][2],
            }))
          );
        },
      }
    );

  // This fetches price and price decimal data for the collateral types when the above hook recieves a response
  const priceCalls = useMemo(() => {
    if (!collateralTypeMetadata) {
      return [];
    }
    const latestRoundData = collateralTypeMetadata.map((ct, i) => {
      const symbol = supportedCollateralTypes[i].symbol.toLowerCase();
      const aggregatorContract = getContract(
        `aggregator_${symbol}.aggregator`,
        provider,
        snxContract!.chainId
      );
      return {
        contract: aggregatorContract!.contract,
        funcName: "latestRoundData",
      };
    });

    const priceDecimals = collateralTypeMetadata.map((ct, i) => {
      const aggregatorContract = getContract(
        `aggregator_${supportedCollateralTypes[
          i
        ].symbol.toLowerCase()}.aggregator`,
        provider,
        snxContract!.chainId
      );
      return {
        contract: aggregatorContract!.contract,
        funcName: "decimals",
      };
    });

    return [...latestRoundData, ...priceDecimals];
  }, [collateralTypeMetadata, provider, snxContract, supportedCollateralTypes]);

  // After the price data is fetched, set the data in recoil and turn off the loading state.
  useContractReads<PriceDataType>(priceCalls, {
    enabled: !!priceCalls.length,
    onSuccess: (data) => {
      setIsLoading(false);
      setSupportedCollateralTypes(
        supportedCollateralTypes.map((ct, i) => {
          const priceDecimals = data[i + supportedCollateralTypes.length];
          const priceData = data[i];
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
