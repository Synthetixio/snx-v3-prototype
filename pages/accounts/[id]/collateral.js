import Head from 'next/head'
import NextLink from "next/link"
import { Container, Box, Heading, Text, Flex, Link } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import Stake from '../../../components/accounts/Stake/index'
import StakedCollateral from '../../../components/accounts/StakedCollateral/index'

export default function Collateral() {
  return (
    <Box>
      <Head>
        <title>Manage Collateral</title>
        <meta name="description" content="Manage Collateral" />
      </Head>
      <Container maxW='container.sm'>

        <Flex mb="6" alignItems="center">
          <Text fontWeight="semibold" fontSize="md">Account #1324</Text>
          <NextLink href={"/accounts/1234"} passHref>
            <Link ml="auto" fontSize="xs" fontWeight="normal" color="blue.400"><ChevronLeftIcon transform="translateY(-1px)" /> Return to overview</Link>
          </NextLink>
        </Flex>

        <Text mb="6">Enable the creation of synthetic assets on the blockchain by staking with Synthetix. Improve your c-ratio and reduce risk of liquidation by providing more collateral.</Text>

        <StakedCollateral />

        <Heading size="md" mb="3">Stake Additional Collateral</Heading>
        <Stake />

      </Container >
    </Box >
  )
}
