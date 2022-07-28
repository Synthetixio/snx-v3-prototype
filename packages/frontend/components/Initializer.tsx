import { useOwnerAccounts, useCollateralTypes } from "../utils/hooks";
import { Spinner } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  children?: React.ReactNode;
};

export const Initializer: FC<Props> = ({ children }) => {
  const { isLoading: isLoadingCollateralTypes } = useCollateralTypes();
  const { isLoading: isLoadingOwnerAccounts } = useOwnerAccounts();
  console.log("isLoadingOwnerAccounts: ", isLoadingOwnerAccounts);

  console.log("isLoadingCollateralTypes", isLoadingCollateralTypes);

  const isLoading = isLoadingCollateralTypes || isLoadingOwnerAccounts;

  return isLoading ? <Spinner mx="auto" my="auto" /> : <>{children}</>;
};
