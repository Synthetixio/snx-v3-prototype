import Head from 'next/head'
import { Container, Box, Heading, Text } from '@chakra-ui/react'
import Subnav from '../../../components/accounts/Subnav/index'
import Stake from '../../../components/accounts/Stake/index'
import StakingPositions from '../../../components/accounts/StakingPositions/index'
import { useRouter } from 'next/router';

export default function Collateral() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Box>
      <Head>
        <title>Manage Collateral</title>
        <meta name="description" content="Manage Collateral" />
      </Head>
      <Container maxW='container.sm'>

        <Subnav />

        <Text mb="6">Enable the creation of synthetic assets on the blockchain by staking with Synthetix. Improve your c-ratio and reduce risk of liquidation by providing more collateral.</Text>

        <StakingPositions accountId={id} />

        <Heading size="md" mb="3">Stake Additional Collateral</Heading>
        <Stake />

      </Container >
    </Box >
  )
}
