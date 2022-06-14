import { CONTRACT_MULTICALL } from '../constants';
import { useContract } from './useContract';
import { ReadContractConfig } from '@wagmi/core';
import { ethers } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { useEffect, useMemo, useState } from 'react';

type ReadMulticallType = {
  contract: ethers.Contract;
  funcName: string;
  args?: ReadContractConfig['args'];
};

type AggregateResult = {
  success: boolean;
  returnData: string;
}[];

export const useContractReads = <Data extends any[] = Result[]>(
  calls: Array<ReadMulticallType>
) => {
  const multicall = useContract(CONTRACT_MULTICALL);
  const [multicallResponse, setMulticallResponse] = useState<Data>();

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

  useEffect(() => {
    const callFunc = async () => {
      const resp = (await multicall?.contract.callStatic['aggregate3'](
        mappedCalls
      )) as AggregateResult;

      const results = resp.map((d, i) => {
        const { contract, funcName } = calls[i];
        const result = contract.interface.decodeFunctionResult(
          funcName,
          d.returnData
        );
        return result[0];
      }) as Data;

      setMulticallResponse(results);
    };

    if (multicallResponse) {
      return;
    }
    callFunc();
  }, [calls, mappedCalls, multicall, multicallResponse]);

  return {
    isLoading: !multicallResponse,
    data: multicallResponse,
  };
};
