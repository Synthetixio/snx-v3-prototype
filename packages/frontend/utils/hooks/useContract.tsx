import { chainIdState } from '../../state';
import { getChainById } from '../constants';
import { useRecoilState } from 'recoil';
import ethers from 'ethers';
import { useMemo } from 'react';

export const useContract = (name: string) => {
  const [localChainId] = useRecoilState(chainIdState);
  const chain = getChainById(localChainId);

  return useMemo(() => {
    if (!chain) {
      return null;
    }

    const contractInfo = require(`./deployments/${chain.name}/${name}.json`);

    return {
      address: contractInfo.address,
      abi: contractInfo.abi,
      contract: new ethers.Contract(contractInfo.address, contractInfo.abi),
      chainId: localChainId,
    };
  }, [name, chain, localChainId]);
};
