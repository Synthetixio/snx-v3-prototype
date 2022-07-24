import { CollateralType } from "../utils/constants";
import { atom } from "recoil";
import { useContractRead } from "wagmi";

export const collateralTypesState = atom<Array<CollateralType>>({
  key: "collateralTypes",
  default: [],
});

type RefetchType = ReturnType<typeof useContractRead>["refetch"];
export const accountsState = atom<{
  accounts: Array<number>;
  refetchAccounts?: RefetchType;
}>({
  key: "userAccounts",
  default: {
    accounts: [],
  },
});

export const chainIdState = atom({
  key: "localChainId",
  default: 0,
});
