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

type ConfigType<T> = {
  enabled?: boolean;
  onSuccess: (data: T) => void;
};

export const useContractReads = <Data extends any[] = Result[]>(
  calls: Array<ReadMulticallType>,
  config: Partial<ConfigType<Data>> = {}
) => {
  const { enabled = true, onSuccess = () => {} } = config;
  const multicall = useContract(CONTRACT_MULTICALL);
  const [multicallResponse, setMulticallResponse] = useState<Data>();

  const mappedCalls = useMemo(
    () =>
      calls.map(({ contract, funcName, args }) => {
        const params = Array.isArray(args) ? args : args ? [args] : [];
        const callData = contract.interface.encodeFunctionData(
          funcName,
          params
        );
        if (!contract[funcName])
          console.warn(
            `"${funcName}" is not in the interface for contract "${contract.address}"`
          );
        return {
          target: contract.address,
          allowFailure: false,
          callData,
        };
      }),
    [calls]
  );

  useEffect(() => {
    if (multicallResponse || !enabled) {
      return;
    }

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
        return Array.isArray(result) && result.length === 1
          ? result[0]
          : result;
      }) as Data;

      onSuccess && onSuccess(results);
      setMulticallResponse(results);
    };

    callFunc();
  }, [
    calls,
    enabled,
    mappedCalls,
    multicall?.contract.callStatic,
    multicallResponse,
    onSuccess,
  ]);

  return {
    isLoading: !multicallResponse,
    data: multicallResponse,
  };
};
