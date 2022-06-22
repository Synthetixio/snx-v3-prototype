import { collateralTypesState } from "../../../state";
import { fundsData } from "../../../utils/constants";
import { useSynthetixRead } from "../../../utils/hooks";
import StakingPosition from "./StakingPosition";
import { StakingPositionType } from "./types";
import { Box, Heading, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function StakingPositions({ accountId }: { accountId: Number }) {
  const [stakingPositions, setStakingPositions] = useState<
    StakingPositionType[]
  >([]);

  const [supportedCollateralTypes] = useRecoilState(collateralTypesState);
  console.log("supportedCollateralTypes: ", supportedCollateralTypes);

  useSynthetixRead("getAccountLiquidityItems", {
    args: [accountId],
    /*
      address collateralType;
      uint256 fundId;
      uint256 accountId;
      uint256 leverage;
      uint256 collateralAmount;
      uint256 shares;
      uint256 initialDebt;
    */
    onSuccess: data => {
      const positions = data.map(
        ([
          collateralAddress,
          fundId,
          _accountId,
          _leverage,
          collateralAmount,
          _shares,
          _initialDebt,
        ]) => {
          const collateralType = supportedCollateralTypes.find(
            ct => ct.address === collateralAddress
          );
          return {
            fundId,
            fundName: fundsData[fundId.toString()].name,
            collateralAmount,
            collateralSymbol: collateralType?.symbol || "",
            collateralType: collateralType || supportedCollateralTypes[0],
            collateralValue:
              collateralType?.price?.mul(collateralAmount) || BigNumber.from(0),
          };
        }
      );

      setStakingPositions(positions);
    },
  });

  return stakingPositions?.length ? (
    <Box>
      <Heading size="md" mb="2">
        Staking Positions
      </Heading>

      <Table size="sm" variant="simple" mb="9">
        <Thead>
          <Tr>
            <Th color="rgba(255,255,255,0.8)" pb="2">
              Collateral
            </Th>
            <Th color="rgba(255,255,255,0.8)" pb="2">
              Debt
            </Th>
            <Th color="rgba(255,255,255,0.8)" pb="2">
              C-Ratio
            </Th>
            <Th color="rgba(255,255,255,0.8)" pb="2">
              Fund
            </Th>
            <Th color="rgba(255,255,255,0.8)" pb="2"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {stakingPositions.map(position => {
            return <StakingPosition key={position.id} position={position} />;
          })}
          {/*
            <Tr>
              <Td py="4">
                <Text fontSize="xs" mb="1">Total Staked Value</Text>
                $6,264.32
              </Td>
              <Td>
              </Td>
              <Td>
                <Text fontSize="xs" mb="1">Total Voting Power</Text>
                17,000
              </Td>
              <Td isNumeric>
              </Td>
            </Tr>
            */}
        </Tbody>
      </Table>
    </Box>
  ) : null;
}
