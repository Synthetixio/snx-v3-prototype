import Head from 'next/head'
import {
  Container, Box, Heading, Text, Tooltip, Badge,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  InputGroup,
  InputLeftAddon,
  IconButton
} from '@chakra-ui/react'
import { ChevronLeftIcon, EditIcon, ExternalLinkIcon, QuestionOutlineIcon, ChevronDownIcon, LockIcon, SettingsIcon } from '@chakra-ui/icons'

export default function Settings() {

  return (
    <Box>
      <Head>
        <title>Account Settings</title>
        <meta name="description" content="Account Settings" />
      </Head>
      <Container maxW='container.sm'>
        <Box mb="6">
          <Link fontSize="sm" mb="1"><ChevronLeftIcon />Back</Link>
          <Text fontWeight="semibold" fontSize="md">Account #1324</Text>
        </Box>

        <Text mb="4">Explainer text here. Collateral backs synths and futures markets, etc.</Text>

        <Heading size="md" mb="2">Stake Collateral</Heading>

        <Box bg="gray.900" mb="8" p="6" borderRadius="12px">
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
                    <Box w="24px" h="24px" borderRadius="12px" overflow="hidden" mr="1">
                      <img width="24" height="24" src="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png" />
                    </Box>
                    <Text fontWeight="600">SNX</Text>
                  </Flex>
                  <Text fontSize="xs" d="block">&times;10 Voting Power</Text>
                </MenuItem>
                <MenuItem alignItems="left" mb={1} flexDirection="column" _hover={{ bg: 'gray.800' }} _focus={{ bg: 'gray.800' }} _active={{ bg: 'gray.800' }}>
                  <Flex flexDirection="row">
                    <Box w="24px" h="24px" borderRadius="12px" overflow="hidden" mr="1">
                      <img width="24" height="24" src="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x5f98805A4E8be255a32880FDeC7F6728C6568bA0/logo.png" />
                    </Box>
                    <Text fontWeight="600">LUSD</Text>
                  </Flex>
                  <Text fontSize="xs" d="block">&times;4 Voting Power</Text>
                </MenuItem>
                <MenuItem alignItems="left" flexDirection="column" _hover={{ bg: 'gray.800' }} _focus={{ bg: 'gray.800' }} _active={{ bg: 'gray.800' }}>
                  <Flex flexDirection="row">
                    <Box w="24px" h="24px" borderRadius="12px" overflow="hidden" mr="1">
                      <img width="24" height="24" src="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png" />
                    </Box>
                    <Text fontWeight="600">ETH</Text>
                  </Flex>
                  <Text fontSize="xs" d="block">&times;1 Voting Power</Text>
                </MenuItem>
              </MenuList>
            </Menu>
            <Tooltip label="Configure Staking Position">
              <IconButton ml="3" bg="transparent" border="1px solid rgba(255,255,255,0.33)" size="lg" aria-label='Configure Staking Position' icon={<SettingsIcon />} />
            </Tooltip>
            <Tooltip label="Configure Lock">
              <IconButton ml="3" bg="transparent" border="1px solid rgba(255,255,255,0.33)" size="lg" aria-label='Configure Lock' icon={<LockIcon />} />
            </Tooltip>
            <Button size="lg" colorScheme='blue' ml="4" px="8" onClick={() => { Router.push('/accounts/example') }}>Stake</Button>
          </Flex>
          <Flex alignItems="center">
            <Text fontSize="xs" mr="auto">Balance: 2,000
              <Badge ml="2" variant='outline' colorScheme='blue' transform="translateY(-1px)">
                Use Max
              </Badge>
            </Text>
            <Text fontSize="xs" textAlign="right">This will increase your C-Ratio by XX%</Text>
          </Flex>
        </Box>

        <Heading size="md" mb="2">Staked Collateral</Heading>

        <Table size="sm" variant="simple" mb="8">
          <Thead>
            <Tr>
              <Th color="white" pb="2">
                Amount
              </Th>
              <Th color="white" pb="2">
                Staking Position
              </Th>
              <Th color="white" pb="2">
                Lock
              </Th>
              <Th color="white" pb="2">
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td py="4">
                1,000 SNX
                <Text fontSize="xs" opacity="0.66" mt="1'">$5,264.34</Text>
              </Td>
              <Td>
                Spartan Council
                <Link color="blue.400" ml="1">
                  <ExternalLinkIcon style={{ transform: 'translateY(-2px)' }} />
                </Link>
                <Text fontSize="xs" opacity="0.66" mt="1'">&times;3 Leverage
                  <Link color="blue.400" ml="1">
                    <EditIcon style={{ transform: 'translateY(-1px)' }} />
                  </Link></Text>
              </Td>
              <Td>
                100 years <Link color="blue.400" ml="1">
                  <EditIcon style={{ transform: 'translateY(-1px)' }} />
                </Link>
                <Text fontSize="xs" opacity="0.66" mt="1'">16,000 voting power <Tooltip label="Amount x collateral power modifier x lock power modifier"><QuestionOutlineIcon
                  transform="translateY(-1.5px)" /></Tooltip></Text>
              </Td>
              <Td isNumeric>
                <Tooltip label="You must unlock this collateral before unstaking">
                  <Button size="xs" colorScheme="red" isDisabled>Unstake</Button>
                </Tooltip>
              </Td>
            </Tr>
            <Tr>
              <Td py="4">
                1,000 LUSD
                <Text fontSize="xs" opacity="0.66" mt="1'">$1,000.00</Text>
              </Td>
              <Td>
                <Text opacity="0.66">None</Text>
                <Text fontSize="xs" mt="1'">
                  <Link color="blue.400">
                    Add staking position
                  </Link></Text>
              </Td>
              <Td>
                <Text opacity="0.66" d="inline">None</Text><Link color="blue.400" ml="1">
                  <EditIcon style={{ transform: 'translateY(-1px)' }} />
                </Link>
                <Text fontSize="xs" opacity="0.66" mt="1'">1,000 voting power <Tooltip label="Amount x collateral power modifier x lock power modifier"><QuestionOutlineIcon
                  transform="translateY(-1.5px)" /></Tooltip></Text>
              </Td>
              <Td isNumeric>
                <Button size="xs" colorScheme="red">Unstake</Button>
              </Td>
            </Tr>
            <Tr>
              <Td py="4">
                <Text fontSize="xs" mb="1">Total Staked Value</Text>
                $6,264.32
              </Td>
              <Td>
              </Td>
              <Td>
                <Text fontSize="xs" mb="1">Total Voting Power</Text>
                17,000
              </Td>
              <Td isNumeric>
              </Td>
            </Tr>
          </Tbody>
        </Table>

      </Container >
    </Box >
  )
}
