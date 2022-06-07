import { chainIdState } from '../state';
import { getChainNameById, MAINNET_CHAIN_ID } from '../utils/constants';
import { Spinner } from '@chakra-ui/react';
import { ChainName } from '@wagmi/core/dist/declarations/src/constants/chains';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useRef, FC, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { useNetwork, chainId as chainMapping } from 'wagmi';

type Props = {
  children?: React.ReactElement | React.ReactElement[];
};
/*
  This keeps localChainId in sync with RainbowKit/wagmi hooks. 
  localChainId is used to query contracts without needing to connect a wallet.

  Remove this hack, once wagmi adopts this.
*/
export const NetworkChain: FC<Props> = ({ children }) => {
  const [localChainId, setLocalChainId] = useRecoilState(chainIdState);
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
    onSuccess: data => {
      setLocalChainId(data.id);
      routeToChain(data.id);
    },
  });

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(
        window.ethereum as ethers.providers.ExternalProvider,
        'any'
      );

      web3Provider.on('network', (newNetwork, oldNetwork) => {
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

  return Boolean(localChainId) ? (
    <>{children}</>
  ) : (
    <Spinner mx="auto" my="auto" />
  );
};
