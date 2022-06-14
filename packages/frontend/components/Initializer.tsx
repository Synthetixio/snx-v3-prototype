import { chainIdState, collateralTypesState } from '../state';
import { localCollateralTypes, LOCALHOST_CHAIN_ID } from '../utils/constants';
import { useSynthetixRead } from '../utils/hooks';
import { Spinner } from '@chakra-ui/react';
import { tokens } from '@uniswap/default-token-list';
import { FC } from 'react';
import { useRecoilState } from 'recoil';

type Props = {
  children?: React.ReactNode;
};

export const Initializer: FC<Props> = ({ children }) => {
  const [localChainId] = useRecoilState(chainIdState);
  const [collateralTypes, setCollateralTypes] =
    useRecoilState(collateralTypesState);
  useSynthetixRead('getCollateralTypes', {
    args: [true],
    onError(err) {
      // TODO: throw up a toast
      // report to sentry or some other tool
      console.log('ERR', err);
    },
    onSuccess(data) {
      console.log(data);
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

  /*
  Populate collateral types with full on-chain data plus price information
  collateralTypes.forEach((collateralType) => {
    useSynthetixRead("getCollateralType", {
      args: [collateralType.address],
      onSuccess(data) {
        // call the contract at data.priceFeed with abi `agreegagor_${symbol}.aggregator`, function latestRoundData and function decimals
        // merge the getCollateralType response into the recoil instance plus latestRoundData as priceData and decimals and priceDecimals
      },
    });
  });
  */

  return collateralTypes.length ? (
    <>{children}</>
  ) : (
    <Spinner mx="auto" my="auto" />
  );
};
