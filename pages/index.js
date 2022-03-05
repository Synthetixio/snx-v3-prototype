import Head from 'next/head'
import NextLink from "next/link";
import { useState } from 'react';
import { Container, Box, Heading, Text, Link, Input, Flex, Button, Badge, UnorderedList, ListItem } from '@chakra-ui/react'
import { InfoOutlineIcon, AddIcon } from '@chakra-ui/icons'
import Router from 'next/router'
import EditPosition from '../components/stakers/EditPosition/index'


export default function Home() {
  const [easyMode, setEasyMode] = useState(true);

  // This renders the staker create view if no wallet is connected or no lp token is in the connected wallet
  // This renders the show lp token view if there's only on token with a 'create new lp token/staker' button on the bottom
  // Otherwise, this renders a list of lp tokens with a create new button on it.

  return (
    <Box>
      <Head>
        <title>Synthetix Staking</title>
        <meta name="description" content="Synthetix Staking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW='container.sm'>
        <Box>
          <Flex>
            <Heading size="md" mb="2" mr="auto">Stake SNX</Heading>
            <Button size="xs" fontWeight="semibold" colorScheme="white" variant="outline" onClick={() => setEasyMode(!easyMode)}>Switch to {easyMode ? "advanced" : "easy"} mode</Button>
          </Flex>
          <Text mb="3" fontSize="sm">By staking SNX tokens, you enable the creation of synthetic assets on the blockchain. You earn rewards but must also maintain your c-ratio. You can unstake at any time. <Link fontWeight="semibold" color="blue.400">Learn more</Link></Text>
          {easyMode ? <>
            <Box bg="gray.900" mb="6" p="4" borderRadius="12px">
              <Flex mb="2">
                <Input size="lg" border="none" placeholder='0.0' />
                <Button size="lg" colorScheme='blue' ml="4" onClick={() => { Router.push('/stakers/example') }}>Stake</Button>
              </Flex>
              <Flex alignItems="center">
                <Text fontSize="xs" mr="auto">Balance: 2,000
                  <Badge ml="2" variant='outline' colorScheme='blue'>
                    Use Max
                  </Badge>
                  <Badge ml="2" variant='outline' colorScheme='blue'>
                    Buy SNX
                  </Badge>
                </Text>
                <Text fontSize="xs" textAlign="right">Receive an snxStake token and $12,000 sUSD <InfoOutlineIcon /></Text>
              </Flex>
            </Box>

            <Heading size="sm" mb="2">Here’s how it works</Heading>
            <UnorderedList>
              <ListItem mb="1">By default, your staking position will be managed by the <Link>Spartan Council</Link>, a DAO elected by SNX token holders.  <NextLink href={"/dao"} passHref>
                <Link fontWeight="semibold" color="blue.400">Go vote</Link></NextLink></ListItem>
              <ListItem mb="1">Currently, your projected rewards are <strong>33% APY in sUSD plus 64% APY in SNX</strong> and you’ll need to maintain a c-ratio of at least 300%.</ListItem>
              <ListItem mb="1">Once you stake, we’ll walk you through c-ratio maintenance.</ListItem>
            </UnorderedList>
          </>
            :
            <>
              <Box bg="gray.900" mb="8" p="4" borderRadius="16px">
                <Input size="lg" border="none" placeholder='0.0' mb="2" />
                <Text fontSize="xs" mr="auto">Balance: 2,000
                  <Badge ml="2" variant='outline' colorScheme='blue'>
                    Use Max
                  </Badge>
                  <Badge ml="2" variant='outline' colorScheme='blue'>
                    Buy SNX
                  </Badge></Text>
              </Box>

              <Text mb="2">Delegate management of your staking position to others or manually configure it:</Text>
              <EditPosition />

              <Flex mt="8">
                <NextLink href={"/synths/create"} passHref><Button size="xs" colorScheme="green"><AddIcon w="2" h="2" />&nbsp;&nbsp;Create a synth</Button></NextLink>
              </Flex>
            </>
          }
        </Box>
      </Container >
    </Box >
  )
}
