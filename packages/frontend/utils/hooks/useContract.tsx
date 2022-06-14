import { chainIdState } from '../../state';
import { getChainById } from '../constants';
import { ethers } from 'ethers';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { useProvider } from 'wagmi';

// Similar to https://wagmi.sh/docs/hooks/useContract, but its aware of the currently selected network.
export const useContract = (name: string) => {
  const [localChainId] = useRecoilState(chainIdState);
  const chain = getChainById(localChainId);
  const provider = useProvider();

  return useMemo(() => {
    if (!chain) {
      return null;
    }

    const chainName =
      chain.name.toLowerCase() == 'localhost'
        ? 'hardhat'
        : chain.name.toLowerCase();
    const contractInfo = require(`../../deployments/${chainName}/${name}.json`);

    return {
      address: contractInfo.address,
      abi: contractInfo.abi,
      contract: new ethers.Contract(
        contractInfo.address,
        contractInfo.abi,
        provider
      ),
      chainId: localChainId,
    };
  }, [chain, name, provider, localChainId]);
};
