import { useContract } from "./useContract";
import { useContractWrite } from "wagmi";

type ContractWriteParams = Parameters<typeof useContractWrite>;

// A convenience hook for writing to the main Synthetix proxy contract.
export const useSynthetixWrite = (
  funcName: string,
  args: ContractWriteParams[2]
) => {
  return useDeploymentWrite("synthetix.Proxy", funcName, args);
};

// Similar to https://wagmi.sh/docs/hooks/useContractWrite, but its aware of the currently selected network and the user specifies the contract name rather than address.
export const useDeploymentWrite = (
  contractName: string,
  funcName: string,
  args?: ContractWriteParams[2]
) => {
  const contract = useContract(contractName);
  return useContractWrite(
    {
      addressOrName: contract?.address,
      contractInterface: contract?.abi || "",
    },
    funcName,
    {
      ...args,
    }
  );
};
