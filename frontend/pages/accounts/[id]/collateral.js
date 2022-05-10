import Head from 'next/head'
import NextLink from "next/link"
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
  IconButton,
  useDisclosure,
  Grid, GridItem, Progress, FormControl, FormLabel, InputGroup, InputRightAddon, ButtonGroup,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody
} from '@chakra-ui/react'
import { ChevronLeftIcon, EditIcon, WarningIcon, ChevronDownIcon, SettingsIcon, CalendarIcon } from '@chakra-ui/icons'
import Stake from '../../../components/accounts/Stake/index'
import EditPosition from '../../../components/accounts/EditPosition/index'

export default function Settings() {
  const { isOpen: isOpenFund, onOpen: onOpenFund, onClose: onCloseFund } = useDisclosure()
  const { isOpen: isOpenLock, onOpen: onOpenLock, onClose: onCloseLock } = useDisclosure()

  return (
    <Box>
      <Head>
        <title>Manage Collateral</title>
        <meta name="description" content="Manage Collateral" />
      </Head>
      <Container maxW='container.sm'>

        <Flex mb="6" alignItems="center">
          <Text fontWeight="semibold" fontSize="md">Account #1324</Text>
          <NextLink href={"/accounts/example"} passHref>
            <Link ml="auto" fontSize="xs" fontWeight="normal" color="blue.400"><ChevronLeftIcon /> Return to overview</Link>
          </NextLink>
        </Flex>

        <Text mb="6">Enable the creation of synthetic assets on the blockchain by staking with Synthetix. Improve your c-ratio and reduce risk of liquidation by providing more collateral.</Text>

        <Heading size="md" mb="3">Staked Collateral</Heading>

        <Table size="sm" variant="simple" mb="9">
          <Thead>
            <Tr>
              <Th color="white" pb="2">
                Amount
              </Th>
              <Th color="white" pb="2">
                Debt
              </Th>
              <Th color="white" pb="2">
                C-Ratio
              </Th>
              <Th color="white" pb="2">
                Staking Position
              </Th>
              {/*
              <Th color="white" pb="2">
                Lock
              </Th>
              */}
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
              <Td py="4">
                $3,200
                <Text fontSize="xs" opacity="0.66" mt="1'">$342 from sUSD</Text>
              </Td>
              <Td py="4">
                400%
                <Text fontSize="xs" opacity="0.66" mt="1'">{/*target here as well?*/}300% Min.</Text>
              </Td>
              <Td>
                <NextLink href={"/funds/example"} passHref>
                  <Link _hover={{ textDecoration: 'none' }} d="inline" borderBottom="1px dotted rgba(255,255,255,0.5)">Spartan Council</Link>
                </NextLink>
                <Link color="blue.400" ml="1">
                  <EditIcon onClick={onOpenFund} style={{ transform: 'translateY(-2px)' }} />
                </Link>
                {/*<Text fontSize="xs" opacity="0.66" mt="1'">&times;1 Leverage</Text>*/}
              </Td>
              {/*
              <Td>
                100 years <Link color="blue.400">
                  <EditIcon onClick={onOpenLock} style={{ transform: 'translateY(-2px)' }} />
                </Link>
                <Text fontSize="xs" opacity="0.66" mt="1'">16,000 voting power <Tooltip label="Amount x collateral power modifier x lock power modifier"><QuestionOutlineIcon
                  transform="translateY(-1.5px)" /></Tooltip></Text>
              </Td>
              */}
              <Td isNumeric>
                <Button size="xs" colorScheme="red">Unstake</Button>
              </Td>
            </Tr>
            <Tr>
              <Td py="4">
                1,000 LUSD
                <Text fontSize="xs" opacity="0.66" mt="1'">$1,000.00</Text>
              </Td>
              <Td py="4">
                $3,200
                <Text fontSize="xs" opacity="0.66" mt="1'">$342 from sUSD</Text>
              </Td>
              <Td py="4">
                <Text fontWeight="bold" color="red">232% <WarningIcon transform="translateY(-1px)" /></Text>
                <Text fontSize="xs" opacity="0.66" mt="1'">200% Min.</Text>
              </Td>
              <Td>
                <Text opacity="0.66">None
                  <Link color="blue.400" ml="1">
                    <EditIcon onClick={onOpenFund} style={{ transform: 'translateY(-2px)' }} />
                  </Link></Text>
                {/*
                <Text fontSize="xs" mt="1'">
                  <Link onClick={onOpenFund} color="blue.400">
                    Add staking position
                  </Link></Text>
                */}
              </Td>
              {/*
              <Td>
                <Text opacity="0.66" d="inline">None</Text><Link color="blue.400" ml="1">
                  <EditIcon onClick={onOpenLock} style={{ transform: 'translateY(-2px)' }} />
                </Link>
                <Text fontSize="xs" opacity="0.66" mt="1'">1,000 voting power <Tooltip label="Amount x collateral power modifier x lock power modifier"><QuestionOutlineIcon
                  transform="translateY(-1.5px)" /></Tooltip></Text>
              </Td>
              */}
              <Td isNumeric>
                <Button size="xs" colorScheme="red">Unstake</Button>
              </Td>
            </Tr>
            {/*
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
            */}
          </Tbody>
        </Table>

        <Heading size="md" mb="3">Stake Additional Collateral</Heading>
        <Stake />

        <Modal size="2xl" isOpen={isOpenLock} onClose={onCloseLock}>
          <ModalOverlay />
          <ModalContent bg="black" color="white">
            <ModalHeader>Manage Lock [WIP]</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Grid templateColumns='repeat(2, 1fr)' gap={6} alignItems="center">
                <GridItem mb="4">
                  Lock your staked SNX tokens to increase your rewards, fees, and voting power. Benefits scale the longer you lock.
                </GridItem>
                <GridItem mb="4">
                  <Heading mb="1.5" size="sm">Locked SNX</Heading>
                  <Progress mb="1" value="23" colorScheme="green" size="sm" borderRadius="4" />
                  <Text fontSize="xs">
                    Total Locked SNX: 2.3MM<br />
                    SNX Floating Supply: 8.2MM
                  </Text>
                </GridItem>
              </Grid>

              <Heading mb="2" size="md">Lock Collateral</Heading>

              <Heading mb="2" size="md">Extend Lock</Heading>

              <Grid mb="2" templateColumns='repeat(3, 1fr)' gap={4}>
                <GridItem mb="4">
                  <FormControl>
                    <FormLabel htmlFor='amount'>Amount</FormLabel>
                    <InputGroup size="sm">
                      <Input id='amount' type='amount' />
                      <InputRightAddon color="black">SNX</InputRightAddon>
                    </InputGroup>
                  </FormControl>
                </GridItem>
                <GridItem mb="4">
                  <FormControl mb="6">
                    <FormLabel htmlFor='name'>Lock Duration</FormLabel>
                    <ButtonGroup size="sm" isAttached colorScheme='blue' variant="outline">
                      <Button mr='-px'>1W</Button>
                      <Button mr='-px'>1M</Button>
                      <Button mr='-px'>3M</Button>
                      <Button mr='-px'>6M</Button>
                      <Button mr='-px'>1Y</Button>
                      <Button mr='-px'>2Y</Button>
                      <IconButton aria-label='Custom' icon={<CalendarIcon />} />
                    </ButtonGroup>
                  </FormControl>
                </GridItem>
                <GridItem mb="4">
                  <Button size="sm" colorScheme="blue" w="100%" mt="8">Lock</Button>
                </GridItem>
              </Grid>

              <Heading mb="2" size="md">Unlock</Heading>

              <Text>You can unlock your collateral early, allowing you to unstake it, but will incur a penalty of <strong>50%</strong>. The penalized collateral is liquidated.</Text>

            </ModalBody>
          </ModalContent>
        </Modal>

      </Container >
    </Box >
  )
}
