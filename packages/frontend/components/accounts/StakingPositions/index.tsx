import StakingPosition from "./StakingPosition";
import { Box, Heading, Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";

export default function StakingPositions({ accountId }) {
  let stakingPositions = [];

  // This is a view of each LiquidityItem (https://github.com/Synthetixio/synthetix-v3/blob/feature-v3-mvp/packages/synthetix-main/contracts/interfaces/IFundModuleStorage.sol)
  // (We should consider consistent naming for this and the front-end.)
  // All LiquidityItems associated with the account can be retrieved by calling "getAccountLiquidityItems(accountId)" (Other related views are available: https://github.com/Synthetixio/synthetix-v3/blob/feature-v3-mvp/packages/synthetix-main/contracts/modules/FundModule.sol#L634)

  type StakingPosition = {
    // This is the ID on of the LiquidityItem struct. (I think this needs to be added? Seems good to have.)
    id: number;

    // This is the fundId on the LiquidityItem struct
    fundId: number;

    // This would be retrieved from recoil most likely. We'll probably want a similar set up to CollateralTypes for the Preferred/Approved funds.
    fundName: string;

    // This is the collateralAmount on the LiquidityItem struct
    collateralAmount: number;

    // This is retrieved from recoil collateralType storage.
    collateralSymbol: string;

    // We'll need a concept of 'collateral type price' (probably stored in recoil?) and this would be the product of that value and collateralAmount.
    collateralValue: number;

    // This is retrieved from recoil collateralType storage.
    collateralMinCRatio: number;

    // This is retrieved from recoil collateralType storage.
    collateralTargetCRatio: number;

    // This is the amount of sUSD debt minted/burned (i.e. could be negative) from this fund (I think this needs to be added?)
    usdDebt: number;

    // This is a function of "shares" and "initialDebt" from the LiquidityItem struct and the fund's total debt and total debt shares. The latter will probably be made available in recoil, per above.
    fundDebt: number;
  };

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
          {stakingPositions.map((position) => {
            <StakingPosition position={position} />;
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
