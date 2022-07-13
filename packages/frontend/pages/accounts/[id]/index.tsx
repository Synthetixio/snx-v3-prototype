import Stake from "../../../components/accounts/Stake/index";
import StakingPositions from "../../../components/accounts/StakingPositions/index";
import {
  StakingPositionOnChainType,
  StakingPositionType,
} from "../../../components/accounts/StakingPositions/types";
import Subnav from "../../../components/accounts/Subnav/index";
import { collateralTypesState } from "../../../state";
import { fundsData } from "../../../utils/constants";
import { useSynthetixProxyEvent, useSynthetixRead } from "../../../utils/hooks";
import { Container, Box, Heading } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";

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
        const collateralType = supportedCollateralTypes.find(
          ct => ct.address === item.collateralType
        );
        return {
          fundId: item.fundId,
          fundName: fundsData[item.fundId.toString()].name,
          collateralAmount: item.collateralAmount,
          collateralSymbol: collateralType?.symbol || "",
          collateralType: collateralType || supportedCollateralTypes[0],
          collateralValue:
            collateralType?.price?.mul(item.collateralAmount) ||
            BigNumber.from(0),
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
      const [_lid, fundId, userAccountId, collateralType, amount, _leverage] =
        event;

      if (accountId === userAccountId.toString()) {
        // TODO: change StakingPositions to be an object for easy lookup
        const positionItemIdx = stakingPositions.findIndex(position =>
          position.fundId.eq(fundId)
        );
        stakingPositions[positionItemIdx] = {
          ...stakingPositions[positionItemIdx],
          collateralAmount: amount,
        };
        setStakingPositions([...stakingPositions]);
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
