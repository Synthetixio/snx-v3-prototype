import { CONTRACT_MULTICALL } from '../constants';
import { useContract } from './useContract';
import { ReadContractConfig } from '@wagmi/core';
import { ethers } from 'ethers';
import { useContractRead } from 'wagmi';

type ReadMulticallType = {
  contract: ethers.Contract;
  funcName: string;
  args?: ReadContractConfig['args'];
};

export const useContractReads = (calls: Array<ReadMulticallType>) => {
  const multicall = useContract(CONTRACT_MULTICALL);

  const mappedCalls = calls.map(({ contract, funcName, args }) => {
    const params = Array.isArray(args) ? args : args ? [args] : [];
    const callData = contract.interface.encodeFunctionData(funcName, params);
    if (!contract[funcName])
      console.warn(
        `"${funcName}" is not in the interface for contract "${contract.address}"`
      );
    return {
      target: contract.address,
      allowFailure: false,
      callData,
    };
  });

  return useContractRead(
    {
      addressOrName: multicall?.address,
      contractInterface: multicall?.abi,
    },
    'aggregate3',
    {
      args: [mappedCalls],
      chainId: multicall?.chainId,
      enabled: Boolean(multicall),
    }
  );
};
