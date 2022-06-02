import { chainIdState } from '../../state';
import { getChainById } from '../constants';
import { useRecoilState } from 'recoil';
import { useContractRead, erc20ABI, useNetwork } from 'wagmi';

type ContractReadParams = Parameters<typeof useContractRead>;

export const useSynthetixRead = (
  funcName: string,
  args: ContractReadParams[2]
) => {
  const [localChainId] = useRecoilState(chainIdState);
  const chain = getChainById(localChainId);
  const contractJSON = require(`./deployments/${chain?.name}/sythentix.proxy.json`);
  return useDeploymentsRead(
    {
      addressOrName: contractJSON.address,
      contractInterface: contractJSON.abi,
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
