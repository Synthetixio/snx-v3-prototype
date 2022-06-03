import { useContract } from './useContract';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { useEffect, useState } from 'react';

import ethers from 'ethers';

// contact, funcion name, arguments
export type MulticallCall = [ethers.Contract, string, any[]];

const CONTRACT_SYNTHETIX_PROXY = 'synthetix.Proxy';
const CONTRACT_MULTICALL = 'Multicall';

/**
 * Executes the given list of transactions on a multicall contract as required.
 * If the list is only 1 operation long, it will be executed directly with no multicall
 * If all operations in the list take place on the synthetix proxy contract, the synthetix proxy multicall will be used.
 * Otherwise, the transactions will be packaged into a Multicall3 call.
 * 
 * If a transaction fails, all transactions following will be cancelled.
 * 
 * It is up to the caller to determine which calls need to be completed (ie whether or not an approval step is needed)
 * 
 * @param calls List of calls to execute. The outer array indicates 
 * operations to run in multiple steps, and the inner array indicates operations to run in the same transaction.
 * @returns a lot of stuff
 */
export const useMulticall = (calls: MulticallCall[][]) => {
  const [step, setStep] = useState(0);
  const completed = step >= calls.length;

  const [receipts, setReceipts] = useState<ethers.providers.TransactionReceipt[]>([]);

  // for synthetix multicall
  const snxProxy = useContract(CONTRACT_SYNTHETIX_PROXY);

  // for regular multicall
  const multicall = useContract(CONTRACT_MULTICALL);
  
  let callContract: ethers.Contract|undefined, callFunc: string|undefined, callArgs: any[]|undefined;
  if (calls.length && snxProxy && multicall) {
    if (calls[step].length === 1) {
      // direct call
      [callContract, callFunc, callArgs] = calls[step][0];
    }
    else if (calls[step].length > 1) {
      if (calls[step].find(c => c[0].address !== snxProxy.address)) {

        // Multicall3
        callContract = multicall.contract;
        callFunc = 'aggregate3';
        callArgs = calls[step].map(c => ({
          target: c[0].address,
          callData: c[0].populateTransaction[c[1]](...(c[2] || [])),
          allowFailure: false,
        }));
      }
      else {
        // Synthetix Multicall
        callContract = snxProxy.contract;
        callFunc = 'multicall';
        callArgs = calls[step].map(c => c[0].populateTransaction[c[1]](...(c[2] || [])));
      }
    }
  }

  //let callContract = calls.length ? calls[step][0][0] : '';
  //let callFunc = calls.length ? 

  const currentTxn = useContractWrite({
    addressOrName: callContract!.address,
    contractInterface: callContract!.interface
  }, callFunc!, { args: callArgs });

  const started = step === 0 && currentTxn.status === 'idle';

  useWaitForTransaction({
    hash: currentTxn.data?.hash,
    timeout: 300000,
    enabled: !!currentTxn,
    onSuccess: nextCall
    // todo: onError
  })

  useEffect(() => {
    if (currentTxn.status === 'success') {

    }
  }, [currentTxn.status]);

  function reset() {
    setStep(0);
    setReceipts([]);
  }

  async function exec() {
    if (!started) {
      await currentTxn.writeAsync();
    }
  }

  useEffect(() => {
    if (step !== 0) {
      currentTxn.write();
    }
  }, [step, currentTxn])

  async function nextCall() {
    const newStep = step + 1;
    setStep(newStep);

    // useEffect above will pick up the step once react recalculates everything
  }

  return {
    step,
    receipts,
    reset,
    exec,
    started,
    completed,
    currentTxn
  }
};
