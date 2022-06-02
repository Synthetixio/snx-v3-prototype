import Head from 'next/head'
import { Container, Box, Heading } from '@chakra-ui/react'
import Subnav from '../../../components/accounts/Subnav/index'
import Stake from '../../../components/accounts/Stake/index'
import StakingPositionss from '../../../components/accounts/StakingPositionss/index'
import { useRouter } from "next/router";

export default function Account() {
  const router = useRouter();
  const { id } = router.query;
  const stakingPositions = []; //TODO: useSynthetixRead();

  return (
    <Box>
      <Head>
        <title>Account #{id}</title>
        <meta name="description" content="Account" />
      </Head>
      <Container maxW='container.sm'>
        <Box>
          <Subnav />
          <StakingPositions stakingPositions={stakingPositions} />
          <Heading size="md" mb="3">Stake {stakingPositions.length > 0 && 'Additional'} Collateral</Heading>
          <Stake />
        </Box>
      </Container>
    </Box>
  )
}
