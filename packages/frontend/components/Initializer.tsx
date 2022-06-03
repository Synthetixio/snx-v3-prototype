import { chainIdState } from '../state';
import {
  getChainById,
  getChainByName,
  getChainNameById,
  MAINNET_CHAIN_ID,
} from '../utils/constants';
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
          switchToChain(newNetwork.chainId);
        }
      });
    }
  }, [switchToChain]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const chainParam = router.query.chain?.toString();

    if (switchNetwork) {
      if (chainParam) {
        const chain = getChainByName(chainParam);
        const chainId = chain ? chain.id : MAINNET_CHAIN_ID;

        switchNetwork(chainId);
        setLocalChainId(chainId);
      } else {
        switchNetwork(MAINNET_CHAIN_ID);
        switchToChain(MAINNET_CHAIN_ID);
      }
    } else {
      if (chainParam) {
        const chain = getChainByName(chainParam);
        chain ? setLocalChainId(chain.id) : switchToChain(MAINNET_CHAIN_ID);
      } else {
        switchToChain(MAINNET_CHAIN_ID);
      }
    }
  }, [switchNetwork, router, switchToChain, setLocalChainId]);

  return null;
};
