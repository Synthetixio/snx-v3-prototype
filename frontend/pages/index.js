import Head from 'next/head'
import NextLink from "next/link";
import { useState } from 'react';
import {
  Container, Box, Heading, Text, Link, Input, Flex, Button, Badge, UnorderedList, ListItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { InfoOutlineIcon, AddIcon, ChevronDownIcon } from '@chakra-ui/icons'
import Router from 'next/router'
import EditPosition from '../components/accounts/EditPosition/index'


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
          <Flex d="none">
            <Heading size="md" mb="2" mr="auto">Synthetix Staking Application</Heading>
            <Button size="xs" fontWeight="semibold" colorScheme="white" variant="outline" onClick={() => setEasyMode(!easyMode)}>Switch to {easyMode ? "advanced" : "easy"} mode</Button>
          </Flex>
          <Text fontSize="lg" mt="14" mb="4">Stake with Synthetix to enable the creation of synthetic assets on-chain. You earn yield but must also maintain your c-ratio. <Link href="https://snx-v3-docs.netlify.app/" fontWeight="semibold" color="blue.400">Learn more</Link></Text>
          {easyMode ? <>
            <Box bg="gray.900" mb="6" p="4" borderRadius="12px">
              <Flex mb="2">
                <Input size="lg" border="none" placeholder='0.0' />
                <Menu>
                  <MenuButton ml="4" border="1px solid rgba(255,255,255,0.33)" borderRadius="6px" alignItems="center" cursor="pointer">
                    <Flex>
                      <Box w="24px" h="24px" borderRadius="12px" overflow="hidden" ml="3.5" mr="1">
                        <img width="24" height="24" src="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png" />
                      </Box>
                      <Text fontWeight="600">SNX</Text>
                      <ChevronDownIcon opacity="0.66" w="5" h="5" ml="4" mr="2" />
                    </Flex>
                  </MenuButton>
                  <MenuList px={2} bg="black" border="1px solid rgba(255,255,255,0.33)">
                    <MenuItem alignItems="left" mb={1} flexDirection="column" _hover={{ bg: 'gray.800' }} _focus={{ bg: 'gray.800' }} _active={{ bg: 'gray.800' }}>
                      <Flex flexDirection="row">
                        <Box w="24px" h="24px" borderRadius="12px" overflow="hidden" mr="2">
                          <img width="24" height="24" src="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png" />
                        </Box>
                        <Text fontWeight="600">SNX</Text>
                      </Flex>
                    </MenuItem>
                    <MenuItem alignItems="left" mb={1} flexDirection="column" _hover={{ bg: 'gray.800' }} _focus={{ bg: 'gray.800' }} _active={{ bg: 'gray.800' }}>
                      <Flex flexDirection="row">
                        <Box w="24px" h="24px" borderRadius="12px" overflow="hidden" mr="2">
                          <img width="24" height="24" src="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x5f98805A4E8be255a32880FDeC7F6728C6568bA0/logo.png" />
                        </Box>
                        <Text fontWeight="600">LUSD</Text>
                      </Flex>
                    </MenuItem>
                    <MenuItem alignItems="left" flexDirection="column" _hover={{ bg: 'gray.800' }} _focus={{ bg: 'gray.800' }} _active={{ bg: 'gray.800' }}>
                      <Flex flexDirection="row">
                        <Box w="24px" h="24px" borderRadius="12px" overflow="hidden" mr="2">
                          <img width="24" height="24" src="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png" />
                        </Box>
                        <Text fontWeight="600">ETH</Text>
                      </Flex>
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Button size="lg" colorScheme='blue' ml="4" px="9" onClick={() => { Router.push('/accounts/example') }}>Stake</Button>
              </Flex>
              <Flex alignItems="center">
                <Text fontSize="xs" mr="auto">Balance: 2,000
                  <Badge ml="2" variant='outline' colorScheme='blue' transform="translateY(-1px)">
                    Use Max
                  </Badge>
                  <Badge ml="2" variant='outline' colorScheme='blue' transform="translateY(-1px)">
                    Buy SNX
                  </Badge>
                </Text>
                <Text fontSize="xs" textAlign="right">Receive an snxAccount token <InfoOutlineIcon transform="translateY(-1.5px)" /></Text>
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
