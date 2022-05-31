import Head from 'next/head'
import NextLink from "next/link";
import { Container, Box, Heading, Text, Flex, Link } from '@chakra-ui/react'
import Stake from '../../../components/accounts/Stake/index'
import StakedCollateral from '../../../components/accounts/StakedCollateral/index'
import { useRouter } from "next/router";
import { SettingsIcon } from '@chakra-ui/icons'

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
          <Flex mb="6" alignItems="center">
            <Text fontWeight="semibold" fontSize="md">Account #{id}</Text>
            <NextLink href={"/accounts/example/settings"} passHref>
              <Link ml="auto" fontSize="xs" fontWeight="normal" color="blue.400"><SettingsIcon transform="translateY(-1px)" /> Account Settings</Link>
            </NextLink>
          </Flex>

          <StakedCollateral />

          <Heading size="md" mb="3">Stake Additional Collateral</Heading>
          <Stake />
        </Box>
      </Container>
    </Box>
  )
}
