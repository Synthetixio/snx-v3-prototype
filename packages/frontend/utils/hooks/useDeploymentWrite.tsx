import { useContract } from './useContract';
import { useContractWrite } from 'wagmi';

type ContractWriteParams = Parameters<typeof useContractWrite>;
export const useDeploymentWrite = (
  contractName: string,
  funcName: string,
  args?: ContractWriteParams[2]
) => {
  const contract = useContract(contractName);
  return useContractWrite(
    {
      addressOrName: contract?.address,
      contractInterface: contract?.abi,
    },
    funcName,
    {
      ...args,
    }
  );
};
