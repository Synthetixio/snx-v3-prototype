import { useContract } from './useContract';
import { useContractWrite } from 'wagmi';

type ContractWriteParams = Parameters<typeof useContractWrite>;
export const useSynthetixWrite = (
  funcName: string,
  args: ContractWriteParams[2]
) => {
  const { chainId, contractJSON } = useContract();
  return useContractWrite(
    {
      addressOrName: contractJSON.address,
      contractInterface: contractJSON.abi,
    },
    funcName,
    {
      ...args,
      chainId,
    }
  );
};
