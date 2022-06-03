import { Container, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import CreateAccount from '../components/accounts/CreateAccount'

// This renders the staker create view if no -wallet is connected or no lp token is in the connected wallet
// This renders the show lp token view if there's only on token with a 'create new lp token/staker' button on the bottom
// Otherwise, this renders a list of lp tokens with a create new button on it.
export default function Home() {
  return (
    <Flex flex="1">
      <Head>
        <title>Synthetix Staking</title>
        <meta name="description" content="Synthetix Staking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.sm" py="8">
        <CreateAccount />
      </Container>
    </Flex>
  )
}
