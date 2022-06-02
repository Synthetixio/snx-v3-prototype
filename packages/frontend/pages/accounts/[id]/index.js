import Head from 'next/head'
import { Container, Box, Heading } from '@chakra-ui/react'
import Subnav from '../../../components/accounts/Subnav/index'
import Stake from '../../../components/accounts/Stake/index'
import StakingPositions from '../../../components/accounts/StakingPositions/index'
import { useRouter } from "next/router";

export default function Account() {
  // If the connect wallet doesn’t own this LP token, remove the c-ratio maintenance component, unstake component, and hedging component. The edit component should be a read component and add a button that opens the edit ui when the connect wallet owns the LP token. Also, editable version here for easy mode need to be rethought. Also, informing the user how changing their position will effect the c-ratio and rewards. This whole view probably needs and advanced mode to handle burning on a per pool basis.

  const router = useRouter();
  const { id } = router.query;
  return (
    <Box>
      <Head>
        <title>Account #{id}</title>
        <meta name="description" content="Account" />
      </Head>
      <Container maxW='container.sm'>
        <Box>
          <Subnav />
          <StakingPositions />
          <Heading size="md" mb="3">Stake Additional Collateral</Heading>
          <Stake />
        </Box>
      </Container>
    </Box>
  )
}
