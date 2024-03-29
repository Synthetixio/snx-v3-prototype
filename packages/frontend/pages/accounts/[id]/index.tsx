import Stake from "../../../components/accounts/Stake/index";
import StakingPositions from "../../../components/accounts/StakingPositions/index";
import {
  StakingPositionOnChainType,
  StakingPositionType,
} from "../../../components/accounts/StakingPositions/types";
import Subnav from "../../../components/accounts/Subnav/index";
import { collateralTypesState } from "../../../state";
import { CollateralType, fundsData } from "../../../utils/constants";
import { useSynthetixProxyEvent, useSynthetixRead } from "../../../utils/hooks";
import { Container, Box, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";

const getCollateralType = (
  address: string,
  supportedCollateralTypes: CollateralType[]
) => supportedCollateralTypes.find(ct => ct.address === address);

export default function Account() {
  const router = useRouter();
  const { id } = router.query;
  const accountId = Array.isArray(id) ? id[0] : id;
  const [supportedCollateralTypes] = useRecoilState(collateralTypesState);
  const [stakingPositions, setStakingPositions] = useState<
    StakingPositionType[]
  >([]);

  useSynthetixRead({
    functionName: "getAccountLiquidityItems",
    select: (data): StakingPositionType[] => {
      return data.map((item: StakingPositionOnChainType) => {
        const collateralType = getCollateralType(
          item.collateralType,
          supportedCollateralTypes
        );
        return {
          fundId: item.fundId,
          fundName: fundsData[item.fundId.toString()].name,
          collateralAmount: item.collateralAmount,
          collateralType: collateralType || supportedCollateralTypes[0],
        };
      });
    },
    args: [accountId],
    onSuccess: data => {
      setStakingPositions(data as StakingPositionType[]);
    },
  });

  useSynthetixProxyEvent({
    eventName: "DelegationUpdated",
    listener: event => {
      const [
        _lid,
        userAccountId,
        fundId,
        collateralTypeAddress,
        collateralAmount,
        _leverage,
      ] = event;

      if (accountId === userAccountId.toString()) {
        // TODO: change StakingPositions to be an object for easy lookup
        const positionItemIdx = stakingPositions.findIndex(position =>
          position.fundId.eq(fundId)
        );
        // create new copy to trigger re-render when setting positions
        if (positionItemIdx === -1) {
          const collateralType = getCollateralType(
            collateralTypeAddress,
            supportedCollateralTypes
          );
          setStakingPositions([
            ...stakingPositions,
            {
              fundId,
              fundName: fundsData[fundId.toString()].name,
              collateralAmount,
              collateralType: collateralType || supportedCollateralTypes[0],
            },
          ]);
        } else {
          stakingPositions[positionItemIdx] = {
            ...stakingPositions[positionItemIdx],
            collateralAmount,
          };
          setStakingPositions([...stakingPositions]);
        }
      }
    },
  });

  return (
    <Box>
      <Head>
        <div>Account #{id}</div>
        <meta name="description" content="Account" />
      </Head>
      <Container maxW="container.sm">
        <Box>
          <Subnav />
          <StakingPositions data={stakingPositions} />
          <Heading size="md" mb="3">
            Stake Collateral
          </Heading>
          <Stake accountId={accountId} stakingPositions={stakingPositions} />
        </Box>
      </Container>
    </Box>
  );
}
