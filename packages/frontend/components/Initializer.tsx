import { chainIdState, collateralTypesState } from "../state";
import {
  CollateralType,
  getChainNameById,
  localCollateralTypes,
  LOCALHOST_CHAIN_ID,
  MAINNET_CHAIN_ID,
} from "../utils/constants";
import { useSynthetixRead } from "../utils/hooks";
import { tokens } from "@uniswap/default-token-list";
import { ChainName } from "@wagmi/core/dist/declarations/src/constants/chains";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useCallback, useRef, FC } from "react";
import { useRecoilState } from "recoil";
import { useNetwork, chainId as chainMapping } from "wagmi";

type Props = {
  children?: (loading: boolean) => React.ReactElement;
};

export const Initializer: FC<Props> = ({ children }) => {
  const [localChainId, setLocalChainId] = useRecoilState(chainIdState);
  const [collateralTypes, setCollateralTypes] =
    useRecoilState(collateralTypesState);
  const router = useRouter();
  const onInitialMount = useRef(true);

  const routeToChain = useCallback(
    (chainId: number) => {
      const chain = getChainNameById(chainId);
      router.replace(
        {
          pathname: router.basePath,
          query: {
            chain,
          },
        },
        undefined,
        {
          shallow: true,
        }
      );
      return chain;
    },
    [router]
  );

  const { switchNetwork, activeChain } = useNetwork({
    onSuccess: (data) => {
      setLocalChainId(data.id);
      routeToChain(data.id);
    },
  });

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(
        window.ethereum as ethers.providers.ExternalProvider,
        "any"
      );

      web3Provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          routeToChain(newNetwork.chainId);
          setLocalChainId(newNetwork.chainId);
        }
      });
    }
  }, [routeToChain, setLocalChainId]);

  const chainParam = router.query.chain?.toString();
  const chainIdParamExists = Boolean(chainParam);
  const chainId = chainMapping[chainParam as ChainName];
  const hasWalletConnected = Boolean(switchNetwork);

  // MOUNT
  // 1. if no query param and active chain id, route to active chain id
  // 2. if no query param and no active chain id, route to mainnet
  // 3. if query param and active chain id, if different, switch nework to query param
  // 4. if query param and no active chain id, set local chain id to query param
  useEffect(() => {
    if (!router.isReady || !onInitialMount.current) {
      return;
    }
    if (chainIdParamExists) {
      if (activeChain) {
        if (activeChain.id !== chainId) {
          if (hasWalletConnected) {
            onInitialMount.current = false;
            switchNetwork!(chainId);
          }
        } else {
          onInitialMount.current = false;
          setLocalChainId(chainId);
        }
      } else {
        setLocalChainId(chainId);
      }
    } else {
      if (activeChain) {
        onInitialMount.current = false;
        setLocalChainId(activeChain.id);
        routeToChain(activeChain.id);
      } else {
        onInitialMount.current = false;
        setLocalChainId(MAINNET_CHAIN_ID);
        routeToChain(MAINNET_CHAIN_ID);
      }
    }
  }, [
    activeChain,
    chainId,
    chainIdParamExists,
    hasWalletConnected,
    routeToChain,
    router.isReady,
    setLocalChainId,
    switchNetwork,
  ]);

  const { refetch } = useSynthetixRead("getCollateralTypes", {
    enabled: false,
    args: { hideDisabled: true },
    onSuccess(data) {
      if (localChainId === LOCALHOST_CHAIN_ID) {
        setCollateralTypes(localCollateralTypes);
      } else {
        // Convert addresses to the data from the token list
        const tokensForLocalChain = tokens.filter(
          (token) => token.chainId === localChainId
        );
        const enrichedCollateralTypes = data
          .map((collateralType) =>
            tokensForLocalChain.find(
              (token) => token.address == collateralType.address
            )
          )
          .filter(function (element) {
            return element !== undefined;
          });
        setCollateralTypes(enrichedCollateralTypes as CollateralType[]);
      }
    },
  });

  useEffect(() => {
    const fetchCollateralTypes = async () => {
      return await refetch();
    };
    if (localChainId) {
      fetchCollateralTypes();
    }
  }, [localChainId, refetch]);

  const isLoading = !Boolean(localChainId) || !Boolean(collateralTypes.length);

  return children ? children(isLoading) : null;
};

// "Error: Query data cannot be undefined
// at Object.onSuccess (webpack-internal:///../../node_modules/react-query/lib/core/query.mjs:320:19)
// at resolve (webpack-internal:///../../node_modules/react-query/lib/core/retryer.mjs:64:50)"
