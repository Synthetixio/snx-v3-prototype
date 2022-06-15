import { useCollateralTypes } from '../utils/hooks/useCollateralTypes';
import { Spinner } from '@chakra-ui/react';
import { FC } from 'react';

type Props = {
  children?: React.ReactNode;
};

export const Initializer: FC<Props> = ({ children }) => {
  const { isLoading: isLoadingCollateralTypes } = useCollateralTypes();

  return isLoadingCollateralTypes ? (
    <Spinner mx="auto" my="auto" />
  ) : (
    <>{children}</>
  );
};
