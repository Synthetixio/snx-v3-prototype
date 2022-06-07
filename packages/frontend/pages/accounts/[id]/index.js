import Stake from '../../../components/accounts/Stake/index';
import StakingPositions from '../../../components/accounts/StakingPositions/index';
import Subnav from '../../../components/accounts/Subnav/index';
import { Container, Box, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Account() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box>
      <Head>
        <title>Account #{id}</title>
        <meta name="description" content="Account" />
      </Head>
      <Container maxW="container.sm">
        <Box>
          <Subnav />
          <StakingPositions accountId={id} />
          <Heading size="md" mb="3">
            Stake Collateral
          </Heading>
          <Stake />
        </Box>
      </Container>
    </Box>
  );
}
