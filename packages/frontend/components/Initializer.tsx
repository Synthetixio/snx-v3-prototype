import { chainIdState, collateralTypesState } from '../state';
import {
  CollateralType,
  localCollateralTypes,
  LOCALHOST_CHAIN_ID,
} from '../utils/constants';
import { useSynthetixRead } from '../utils/hooks';
import { Spinner } from '@chakra-ui/react';
import { tokens } from '@uniswap/default-token-list';
import { useEffect, FC, useMemo } from 'react';
import { useRecoilState } from 'recoil';

type Props = {
  children?: any;
};

export const Initializer: FC<Props> = ({ children }) => {
  const [localChainId] = useRecoilState(chainIdState);
  console.log('LOCALCHAINDI', localChainId);
  const [collateralTypes, setCollateralTypes] =
    useRecoilState(collateralTypesState);
  const { refetch } = useSynthetixRead('getCollateralTypes', {
    args: { hideDisabled: true },
    onError(err) {
      console.log('ERR', err);
    },
    onSuccess(data) {
      console.log('DATA', data);
      if (localChainId === LOCALHOST_CHAIN_ID) {
        setCollateralTypes(localCollateralTypes);
      } else {
        // Convert addresses to the data from the token list
        // const tokensForLocalChain = tokens.filter(
        //   token => token.chainId === localChainId
        // );
        // const enrichedCollateralTypes = data
        //   .map(collateralType =>
        //     tokensForLocalChain.find(
        //       token => token.address == collateralType.address
        //     )
        //   )
        //   .filter(function (element) {
        //     return element !== undefined;
        //   });
        // setCollateralTypes(enrichedCollateralTypes as CollateralType[]);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [localChainId, refetch]);

  return collateralTypes.length ? (
    <>{children}</>
  ) : (
    <Spinner mx="auto" my="auto" />
  );
};
