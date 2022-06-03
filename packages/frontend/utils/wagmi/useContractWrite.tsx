import { useContract } from './useContract';
import { useContractWrite } from 'wagmi';

type ContractWriteParams = Parameters<typeof useContractWrite>;
export const useSynthetixWrite = (
  funcName: string,
  args: ContractWriteParams[2]
) => {
  const { address, abi } = useContract();
  return useContractWrite(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    funcName,
    {
      ...args,
    }
  );
};
