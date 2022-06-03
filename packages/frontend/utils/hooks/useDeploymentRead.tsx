import { chainIdState } from '../../state';
import { useContract } from './useContract';
import { useRecoilState } from 'recoil';
import { useContractRead } from 'wagmi';

type ContractReadParams = Parameters<typeof useContractRead>;

export const useSynthetixRead = (
  funcName: string,
  args: ContractReadParams[2]
) => {
  const contractInfo = useContract('synthetix.Proxy');
  return useDeploymentRead(
    {
      addressOrName: contractInfo!.address,
      contractInterface: contractInfo!.abi,
    },
    funcName,
    args
  );
};

export const useDeploymentRead = (
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
