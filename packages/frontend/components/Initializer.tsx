import { chainIdState } from '../state';
import { getChainNameById, MAINNET_CHAIN_ID } from '../utils/constants';
import { ChainName } from '@wagmi/core/dist/declarations/src/constants/chains';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { useNetwork, chainId as chainMapping } from 'wagmi';

export const Initializer = () => {
  const [_, setLocalChainId] = useRecoilState(chainIdState);
  const router = useRouter();
  const enableAutoSwitchNetwork = useRef(true);

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
      console.log('switch network success', data.id);
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
          console.log('event emitted, new network');
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

  // USER MANUALLY SWITCHES NETWORK
  // 1. set local chain, and route to chain
  useEffect(() => {
    if (!router.isReady || !enableAutoSwitchNetwork.current) {
      return;
    }
    if (chainIdParamExists) {
      if (hasWalletConnected) {
        if (activeChain && activeChain.id !== chainId) {
          enableAutoSwitchNetwork.current = false;
          switchNetwork!(chainId);
        }
      } else {
        setLocalChainId(chainId);
      }
    } else {
      if (activeChain) {
        enableAutoSwitchNetwork.current = false;
        setLocalChainId(activeChain.id);
        routeToChain(activeChain.id);
      } else {
        enableAutoSwitchNetwork.current = false;
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

  return null;
};
