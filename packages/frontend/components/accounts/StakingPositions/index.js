import {
  Box,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from '@chakra-ui/react'
import StakingPosition from './StakingPosition'

export default function StakingPositions({ accountId }) {
  let stakingPositions = [];

  // const liquidityItemIds = useSynthetixRead("liquidityItemIdsByAccount", accountId);
  // This should also update when relevant events are emitted.


  return stakingPositions?.length ? (
    <Box>
      <Heading size="md" mb="2">Staking Positions</Heading>

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
            <Th color="rgba(255,255,255,0.8)" pb="2">
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {stakingPositions.map((position) => {
            <StakingPosition position={position} />
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
  ) : null
}