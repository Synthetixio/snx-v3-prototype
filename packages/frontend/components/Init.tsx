import { CollateralType, localCollateralTypes, LOCALHOST_CHAIN_ID } from '../utils/constants';
import { ChainName } from '@wagmi/core/dist/declarations/src/constants/chains';
import { useRouter } from 'next/router';
import { useEffect, FC } from 'react';
import { useNetwork, chainId as chainMapping } from 'wagmi';
import React from 'react';
import { useSynthetixRead } from '../utils/hooks';
import { tokens } from '@uniswap/default-token-list';

export interface InitContextType {
  localChainId: number,
  collateralTypes: CollateralType[]
  setLocalChainId: (chainId: number) => void
}

export const InitContext = React.createContext<InitContextType>({
  localChainId: 0,
  collateralTypes: [],
  setLocalChainId: () => {}
});

type Props = {
  children?: React.ReactElement | React.ReactElement[];
};
/*
  This keeps localChainId in sync with RainbowKit/wagmi hooks. 
  localChainId is used to query contracts without needing to connect a wallet.

  Remove this hack, once wagmi adopts this.
*/
export const Init: FC<Props> = ({ children }) => {
  const router = useRouter();

  const { switchNetwork, activeChain } = useNetwork();

  const routeChainParam = router.query.chain?.toString();
  const routeChainId = chainMapping[routeChainParam as ChainName];

  // MOUNT
  // 1. if no query param and active chain id, route to active chain id
  // 2. if no query param and no active chain id, route to mainnet
  // 3. if query param and active chain id, if different, switch nework to query param
  // 4. if query param and no active chain id, set local chain id to query param
  useEffect(() => {
    if (routeChainId && switchNetwork) {
      switchNetwork(routeChainId);
    }
  }, [switchNetwork, routeChainId]);

  const { data: collateralAddresses } = useSynthetixRead('getCollateralTypes', {
    args: [true],
    enabled: !!activeChain,
  });


  let collateralTypes: CollateralType[] = [];
  if (activeChain?.id === LOCALHOST_CHAIN_ID) {
    collateralTypes = localCollateralTypes;
  }
  else if (collateralAddresses) {

    const tokensForLocalChain = tokens.filter(
      token => token.chainId === activeChain?.id
    );

    collateralTypes = (collateralAddresses as string[])
      .map(addr =>
        tokensForLocalChain.find(
          token => token.address == addr
        ) as CollateralType
      )
      .filter(v => v);
  }

  console.log('ctypes', collateralTypes.length, collateralAddresses?.length);

  return (
    <InitContext.Provider value={{
      localChainId: activeChain?.id || 0,
      setLocalChainId: switchNetwork!,
      collateralTypes,
    }}>
      <>{children}</>
    </InitContext.Provider>
  );
};
