import Head from 'next/head'
import { Container, Box, Heading, Text, Grid, GridItem } from '@chakra-ui/react'
import Position from '../../components/stakers/Position/index'

export default function Synth() {
  return (
    <Box>
      <Head>
        <title>Staker</title>
        <meta name="description" content="Staker" />
      </Head>
      <Container maxW='container.sm'>
        <Box>
          <Text opacity="0.6" fontSize="sm">snxStake Token Address</Text>
          <Heading size="md" mb="1" mr="auto">0x80d65Bb7b9436A86c1928F93D6E7cc186987Ac54</Heading>
          <Text mb="6" fontSize="sm" fontWeight="semibold">Owner: 0x80d65Bb7b9436A86c1928F93D6E7cc186987Ac54</Text>

          <Grid mb="3" textAlign="center" templateColumns='repeat(4, 1fr)' gap={6}>
            <GridItem mb="3">
              <Text fontSize="sm" fontWeight="semibold">Staked</Text>
              <Heading size="lg">$5,000</Heading>
              <Text opacity="0.6" fontSize="sm">1,000 SNX</Text>
            </GridItem>
            <GridItem mb="3">
              <Text fontSize="sm" fontWeight="semibold">C-Ratio</Text>
              <Heading size="lg">300%</Heading>
              <Text opacity="0.6" fontSize="sm">Minimum 250%</Text>
            </GridItem>
            <GridItem mb="3">
              <Text fontSize="sm" fontWeight="semibold">Fees APY</Text>
              <Heading size="lg">25%</Heading>
              <Text opacity="0.6" fontSize="sm">in sUSD</Text>
            </GridItem>
            <GridItem mb="3">
              <Text fontSize="sm" fontWeight="semibold">Rewards APY</Text>
              <Heading size="lg">75%</Heading>
              <Text opacity="0.6" fontSize="sm">in SNX</Text>
            </GridItem>
          </Grid>

          <Box bg="gray.900" mb="6" p="6" borderRadius="12px">
            <Heading size="sm" mb="2">Maintain Your C-Ratio</Heading>
            <Text fontSize="sm" mb="2">As a staker, you’re enabling the creation of synthetic assets by staking collateral (in the form of SNX tokens) to back them. The ratio of the value of staked collateral and the value of synths can vary as market rates fluctuates. It’s important for the system to keep a high c-ratio, ensuring that the synths are properly backed.</Text>
            <Text fontSize="sm" mb="4">The higher your c-ratio, the greater your share of the fees and rewards. <strong>If your c-ratio drops below your minimum, you may be liquidated and lose your collateral.</strong> There are two ways to increase your c-ratio:</Text>

            <Grid mb="3" templateColumns='repeat(2, 1fr)' gap={3}>
              <GridItem mb="3">
                <Heading size="sm" mb="1">Increase Your Stake</Heading>
                <Text fontSize="xs" mb="1">Provide more collateral to the system.</Text>
                <em>Form here accepts anything and will trade for SNX via 1inch</em>
              </GridItem>
              <GridItem mb="3">
                <Heading size="sm" mb="1">Burn Synths</Heading>
                <Text fontSize="xs" mb="1">Reduce the amount of synths in circulation.</Text>
                <em>Form here accepts anything and will trade for sUSD via 1inch</em>
              </GridItem>
            </Grid>

            <Text>Something about c-ratio notification system</Text>
          </Box>

          <Heading size="md" mb="1">Unstake</Heading>
          <Text fontSize="sm" mb="4">Burn Synths to redeem your SNX tokens</Text>

          <Heading size="md" mb="1">Hedging</Heading>
          <Text fontSize="sm" mb="4">Short explainer, instructing how to read the component below.</Text>

          <Heading size="md" mb="1">Staking Position</Heading>
          <Position />

          <Text mt="4" fontSize="sm">If the connect wallet doesn’t own this LP token, remove the c-ratio maintenance component, unstake component, and hedging component. The edit component should be a read component and add a button that opens the edit ui when the connect wallet owns the LP token. Also, editable version here for easy mode need to be rethought. Also, informing the user how changing their position will effect the c-ratio and rewards. This whole view probably needs and advanced mode to handle burning on a per pool basis.</Text>
        </Box>
      </Container >
    </Box >
  )
}
