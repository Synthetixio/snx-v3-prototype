import { chainIdState } from '../../state';
import { getChainById } from '../constants';
import { ethers } from 'ethers';
import { useContext, useMemo } from 'react';
import { useNetwork, useProvider, useSigner } from 'wagmi';

// Similar to https://wagmi.sh/docs/hooks/useContract, but its aware of the currently selected network.
export const useContract = (name: string) => {
  const signer = useSigner();
  const provider = useProvider();
  const { activeChain } = useNetwork();

  const chain = getChainById(activeChain?.id || 0);

  return useMemo(() => {
    if (!chain) {
      return null;
    }

    const chainName = chain.name.toLowerCase();

    try {
      const contractInfo = require(`../../deployments/${chainName}/${name}.json`);

      return {
        address: contractInfo.address,
        abi: contractInfo.abi,
        contract: new ethers.Contract(contractInfo.address, contractInfo.abi, signer.data || provider),
        chainId: activeChain?.id,
      };
    } catch (err) {
      console.error(`could not load contract: ${name} from ${chainName}`, err);
      return null;
    }
  }, [name, chain, signer.data, provider, activeChain]);
};
