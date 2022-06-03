import { useContract } from './useContract';
import { useContractRead } from 'wagmi';

type ContractReadParams = Parameters<typeof useContractRead>;

// A convenience hook for reading from the main Synthetix proxy contract.
export const useSynthetixRead = (
  funcName: string,
  args: ContractReadParams[2]
) => {
  return useDeploymentRead('synthetix.Proxy', funcName, args);
};

// Similar to https://wagmi.sh/docs/hooks/useContractRead, but its aware of the currently selected network and the user specifies the contract name rather than address.
export const useDeploymentRead = (
  contractName: string,
  funcName: string,
  args: ContractReadParams[2]
) => {
  const contract = useContract(contractName);
  return useContractRead(
    {
      addressOrName: contract?.address,
      contractInterface: contract?.abi || '',
    },
    funcName,
    {
      ...args,
    }
  );
};
