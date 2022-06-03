import { chainIdState } from '../../state';
import { useContract } from './useContract';
import { useRecoilState } from 'recoil';
import { useContractRead } from 'wagmi';

type ContractReadParams = Parameters<typeof useContractRead>;

export const useSynthetixRead = (
  funcName: string,
  args: ContractReadParams[2]
) => {
  const { address, abi } = useContract();
  return useDeploymentsRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    funcName,
    args
  );
};

const useDeploymentsRead = (
  addressArgs: ContractReadParams[0],
  funcName: string,
  args: ContractReadParams[2]
) => {
  const [localChainId] = useRecoilState(chainIdState);
  return useContractRead(addressArgs, funcName, {
    ...args,
    chainId: localChainId,
  });
};
