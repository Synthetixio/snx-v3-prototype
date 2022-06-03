import { chainIdState } from '../../state';
import { getChainById } from '../constants';
import { ethers } from 'ethers';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { erc20ABI } from 'wagmi';

// Similar to https://wagmi.sh/docs/hooks/useContract, but its aware of the currently selected network.
export const useContract = (name: string) => {
  const [localChainId] = useRecoilState(chainIdState);
  const chain = getChainById(localChainId);

  return useMemo(() => {
    if (!chain) {
      return null;
    }

    const contractInfo = require(`../../deployments/hardhat/${name}.json`);

    return {
      address: contractInfo.address,
      abi: erc20ABI,
      contract: new ethers.Contract(contractInfo.address, contractInfo.abi),
      chainId: localChainId,
    };
  }, [name, chain, localChainId]);
};
