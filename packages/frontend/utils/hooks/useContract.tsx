import { chainIdState } from "../../state";
import { getChainById } from "../constants";
import { ethers } from "ethers";
import { useRecoilState } from "recoil";
import { useProvider } from "wagmi";

export const getContract = (
  name: string,
  provider: ethers.providers.BaseProvider,
  localChainId: number
) => {
  const chain = getChainById(localChainId);
  if (!chain) return null;
  const chainName =
    chain.name.toLowerCase() == "localhost"
      ? "hardhat"
      : chain.name.toLowerCase();
  let contractInfo;
  try {
    contractInfo = require(`../../deployments/${chainName}/${name}.json`);
  } catch {
    return null;
  }

  return {
    address: contractInfo.address,
    abi: contractInfo.abi,
    contract: new ethers.Contract(
      contractInfo.address,
      contractInfo.abi,
      provider
    ),
    chainId: localChainId,
  };
};

// Similar to https://wagmi.sh/docs/hooks/useContract, but its aware of the currently selected network.
export const useContract = (name: string) => {
  const [localChainId] = useRecoilState(chainIdState);
  const provider = useProvider();

  return getContract(name, provider, localChainId);
};
