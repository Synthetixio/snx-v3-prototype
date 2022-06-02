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

  const { switchNetwork, activeChain } = useNetwork();

  const switchToChain = useCallback(
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
      setLocalChainId(chainId);
    },
    [router, setLocalChainId]
  );

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(
        window.ethereum as ethers.providers.ExternalProvider,
        'any'
      );

      web3Provider.on('network', (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          console.log('NETWORK CHANGE', newNetwork);
          switchToChain(newNetwork.chainId);
        }
      });
    }
  }, [switchToChain]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const chainIdParam =
      router.query.chainId && parseInt(router.query.chainId.toString());

    if (switchNetwork) {
      if (chainIdParam) {
        const chain = getChainById(chainIdParam);
        const chainId = chain ? chain.id : MAINNET_CHAIN_ID;

        switchNetwork(chainId);
        setLocalChainId(chainId);
      } else {
        switchNetwork(MAINNET_CHAIN_ID);
        switchToChain(MAINNET_CHAIN_ID);
      }
    } else {
      if (chainIdParam) {
        const chain = getChainById(chainIdParam);
        chain ? setLocalChainId(chain.id) : switchToChain(MAINNET_CHAIN_ID);
      } else {
        switchToChain(MAINNET_CHAIN_ID);
      }
    }
  }, [switchNetwork, router, switchToChain, setLocalChainId]);

  return null;
};
