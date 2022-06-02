import { chainIdState } from '../state';
import { getChainById, MAINNET_CHAIN_ID } from '../utils/constants';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useNetwork } from 'wagmi';

export const Initializer = () => {
  const [localChainId, setLocalChainId] = useRecoilState(chainIdState);
  const router = useRouter();

  const { switchNetwork } = useNetwork();

  const navigateToChain = useCallback(
    (chainId: number) => {
      router.replace(
        {
          pathname: router.basePath,
          query: {
            chainId,
          },
        },
        undefined,
        {
          shallow: true,
        }
      );
    },
    [router]
  );

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(
        window.ethereum as ethers.providers.ExternalProvider,
        'any'
      );

      web3Provider.on('network', (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          navigateToChain(newNetwork.chainId);
        }
      });
    }
  }, [navigateToChain]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const chainId =
      router.query.chainId && parseInt(router.query.chainId.toString());

    if (switchNetwork) {
      if (chainId) {
        const chain = getChainById(chainId);

        switchNetwork(chain ? chain.id : MAINNET_CHAIN_ID);
      } else {
        switchNetwork(MAINNET_CHAIN_ID);
        navigateToChain(MAINNET_CHAIN_ID);
      }
    } else {
      if (chainId) {
        const chain = getChainById(chainId);
        setLocalChainId(chainId);

        if (!chain) {
          navigateToChain(MAINNET_CHAIN_ID);
        }
      } else {
        navigateToChain(MAINNET_CHAIN_ID);
      }
    }
  }, [setLocalChainId, switchNetwork, router, navigateToChain]);

  return null;
};
