import EditPosition from '../components/accounts/EditPosition/index'
import Stake from '../components/accounts/Stake/index'
import { AddIcon } from '@chakra-ui/icons'
import {
  Container,
  Box,
  Heading,
  Text,
  Link,
  Input,
  Flex,
  Button,
  Badge,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'
import Head from 'next/head'
import NextLink from 'next/link'
import { useState } from 'react'

// This renders the staker create view if no -wallet is connected or no lp token is in the connected wallet
// This renders the show lp token view if there's only on token with a 'create new lp token/staker' button on the bottom
// Otherwise, this renders a list of lp tokens with a create new button on it.
export default function Home() {
  const [easyMode, setEasyMode] = useState(true)

  return (
    <Flex flex="1">
      <Head>
        <title>Synthetix Staking</title>
        <meta name="description" content="Synthetix Staking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.sm" py="8">
        <Flex display="none">
          <Heading size="md" mb="2" mr="auto">
            Synthetix Staking Application
          </Heading>
          <Button
            size="xs"
            fontWeight="semibold"
            colorScheme="white"
            variant="outline"
            onClick={() => setEasyMode(!easyMode)}
          >
            Switch to {easyMode ? 'advanced' : 'easy'} mode
          </Button>
        </Flex>
        <Text fontSize="lg" mb="4">
          Stake with Synthetix to enable the creation of synthetic assets
          on-chain. You earn yield but must also maintain your C-Ratio.{' '}
          <Link
            href="https://snx-v3-docs.netlify.app/"
            fontWeight="semibold"
            color="blue.400"
          >
            Learn more
          </Link>
        </Text>
        {easyMode ? (
          <>
            <Stake createAccount />
            <Heading size="sm" mb="2">
              Here’s how it works
            </Heading>
            <UnorderedList>
              <ListItem mb="1">
                By default, your staking position will be managed by the{' '}
                <Link>Spartan Council</Link>, a DAO elected by SNX token
                holders.{' '}
                <Link
                  fontWeight="semibold"
                  color="blue.400"
                  isExternal
                  href="https://governance.synthetix.io"
                >
                  Go vote
                </Link>
              </ListItem>
              <ListItem mb="1">
                Currently, your projected rewards are{' '}
                <strong>33% APY in sUSD plus 64% APY in SNX</strong> and you’ll
                need to maintain a C-Ratio of at least 300%.
              </ListItem>
              <ListItem mb="1">
                Once you stake, we’ll walk you through C-Ratio maintenance.
              </ListItem>
            </UnorderedList>
          </>
        ) : (
          <>
            <Box bg="gray.900" p="4" borderRadius="16px">
              <Input size="lg" border="none" placeholder="0.0" mb="2" />
              <Text fontSize="xs" mr="auto">
                Balance: 2,000
                <Badge ml="2" variant="outline" colorScheme="blue">
                  Use Max
                </Badge>
                <Badge ml="2" variant="outline" colorScheme="blue">
                  Buy SNX
                </Badge>
              </Text>
            </Box>

            <Text mb="2">
              Delegate management of your staking position to others or manually
              configure it:
            </Text>
            <EditPosition />

            <Flex mt="8">
              <NextLink href={'/synths/create'} passHref>
                <Button size="xs" colorScheme="green">
                  <AddIcon w="2" h="2" />
                  &nbsp;&nbsp;Create a synth
                </Button>
              </NextLink>
            </Flex>
          </>
        )}
      </Container>
    </Flex>
  )
}
