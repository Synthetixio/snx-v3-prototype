import { useContract } from './useContract';
import { useContractRead } from 'wagmi';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState<Error|null>(null);
  const [data, setData] = useState<any|null>(null);

  async function fetch() {
    console.log('callback function invoked!', args?.enabled, contractName, contract, funcName);
    if (!isLoading && contract && funcName && args?.enabled) {
      setData(null);
      setIsLoading(true);
      try {
        const data = await contract.contract.callStatic[funcName](...(args.args || []));
        setData(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
        setIsFetched(true);
      }
    }
  }

  console.log(args?.enabled, args?.args, contract?.contract, funcName);

  useEffect(() => {
    if (!isFetched) {
      fetch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [args?.enabled, args?.args, contract?.contract, funcName]);

  return {
    isLoading,
    isFetched,
    error,
    data,
    fetch
  }
};
