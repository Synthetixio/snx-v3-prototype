import Head from 'next/head'
import NextLink from "next/link";
import {
  Container, Box, Heading, Text, Grid, GridItem, Flex, Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Tooltip,
  ModalBody,
  ModalCloseButton,
  Progress,
  Link,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  FormControl,
  FormLabel,
  InputRightAddon,
  InputGroup,
  Input,
  ButtonGroup,
  InputLeftAddon,
  IconButton
} from '@chakra-ui/react'
import Position from '../../../components/accounts/Position/index'
import EditPosition from '../../../components/accounts/EditPosition/index'
import { EditIcon, InfoOutlineIcon, CalendarIcon, SettingsIcon } from '@chakra-ui/icons'

export default function Synth() {
  // If the connect wallet doesn’t own this LP token, remove the c-ratio maintenance component, unstake component, and hedging component. The edit component should be a read component and add a button that opens the edit ui when the connect wallet owns the LP token. Also, editable version here for easy mode need to be rethought. Also, informing the user how changing their position will effect the c-ratio and rewards. This whole view probably needs and advanced mode to handle burning on a per pool basis.

  const { isOpen: isOpenPosition, onOpen: onOpenPosition, onClose: onClosePosition } = useDisclosure()
  const { isOpen: isOpenLocks, onOpen: onOpenLocks, onClose: onCloseLocks } = useDisclosure()

  return (
    <Box>
      <Head>
        <title>Account</title>
        <meta name="description" content="Account" />
      </Head>
      <Container maxW='container.sm'>
        <Box>
          <Flex mb="6" alignItems="center">
            <Text fontWeight="semibold" fontSize="md">Account #1324</Text>
            <NextLink href={"/accounts/example/settings"} passHref>
              <Link ml="auto" fontSize="xs" fontWeight="normal" color="blue.400"><SettingsIcon /> Account Settings</Link>
            </NextLink>
          </Flex>
          <Grid mb="3" textAlign="center" templateColumns='repeat(4, 1fr)' gap={6}>
            <GridItem mb="3">
              <Text fontSize="sm" fontWeight="semibold">Staked</Text>
              <Heading size="lg">$5,000</Heading>
              <Text fontSize="sm">
                <NextLink href={"/accounts/example/collateral"} passHref>
                  <Link fontWeight="normal" color="blue.400">Manage Collateral</Link>
                </NextLink>
              </Text>
            </GridItem>
            <GridItem mb="3">
              <Text fontSize="sm" fontWeight="semibold">C-Ratio</Text>
              <Heading size="lg">300%</Heading>
              <Text opacity="0.6" fontSize="sm">Minimum 250%</Text>
            </GridItem>
            <GridItem mb="3">
              <Text fontSize="sm" fontWeight="semibold">Fees APY</Text>
              <Heading size="lg">25%</Heading>
              <Text opacity="0.6" fontSize="sm">in sUSD</Text>
            </GridItem>
            <GridItem mb="3">
              <Text fontSize="sm" fontWeight="semibold">Rewards APY</Text>
              <Heading size="lg">75%</Heading>
              <Text opacity="0.6" fontSize="sm">in SNX</Text>
            </GridItem>
          </Grid>

          <Box bg="gray.900" mb="8" p="6" borderRadius="12px">
            <Heading size="sm" mb="2">Maintain Your C-Ratio</Heading>
            <Text fontSize="sm" mb="2">As a staker, you’re enabling the creation of synthetic assets by staking collateral (in the form of SNX tokens) to back them. The ratio of the value of staked collateral and the value of synths can vary as market rates fluctuate. It’s important for the system to keep a high c-ratio, ensuring that the synths are properly backed.</Text>
            <Text fontSize="sm" mb="4">The higher your c-ratio, the greater your share of the fees and rewards. <strong>If your c-ratio drops below your minimum, you may be liquidated and lose your collateral.</strong> There are two ways to increase your c-ratio:</Text>

            <Grid templateColumns='repeat(2, 1fr)' gap={8}>
              <GridItem>
                <Heading size="sm" mb="1">Increase Your Stake</Heading>
                <Text fontSize="xs" mb="2">Provide more collateral to the system. <Tooltip label="Use the form below to have your staking position managed by the Spartan Council. Click 'Manage Collateral' above to customize your staking position and leverage."><InfoOutlineIcon
                  transform="translateY(-1.5px)" /></Tooltip></Text>
                <Grid templateColumns='repeat(4, 1fr)' gap={3}>
                  <GridItem colSpan={3}>
                    <Input size="sm" id='amount' type='amount' />
                  </GridItem>
                  <GridItem>
                    <Button size="sm" colorScheme="blue" w="100%">Stake</Button>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem>
                <Heading size="sm" mb="1">Burn Synths</Heading>
                <Text fontSize="xs" mb="2">Reduce the amount of synths in circulation.</Text>
                <Grid templateColumns='repeat(4, 1fr)' gap={3}>
                  <GridItem colSpan={3}>
                    <Input size="sm" id='amount' type='amount' />
                  </GridItem>
                  <GridItem>
                    <Button size="sm" colorScheme="blue" w="100%">Burn</Button>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </Box>

          <Text fontSize="lg" mb="6">You’ve earned a total of <strong>$2,230</strong> in exchange fees. <Tooltip label="Your fees, earned when the synths in your staking position are exchanged, are automatically deducted from your debt. You can retrieve the earned fees by minting sUSD."><InfoOutlineIcon
            transform="translateY(-2px)" /></Tooltip></Text>

          <Grid mb="8" templateColumns='repeat(2, 1fr)' gap={8}>
            <GridItem mb="4">
              <Heading size="md" mb="1">Claim Rewards</Heading>
              <Text fontSize="sm" mb="2">SNX rewards incentivize stakers to include various pools in their staking position.</Text>
              <Button size="sm" colorScheme="blue" mb="2">Claim 1,200 SNX</Button>
            </GridItem>
            <GridItem mb="4">

              <Heading size="md" mb="1">Mint sUSD</Heading>
              <Text fontSize="sm" mb="2">Receive a loan of sUSD against your staked collateral. <strong>This will reduce your c-ratio.</strong></Text>
              <Grid templateColumns='repeat(4, 1fr)' gap={3}>
                <GridItem colSpan={3}>
                  <InputGroup size="sm">
                    <InputLeftAddon bg="black">$</InputLeftAddon>
                    <Input id='amount' type='amount' borderLeft="none" />
                  </InputGroup>
                </GridItem>
                <GridItem>
                  <Button size="sm" colorScheme="blue" w="100%">Mint</Button>
                </GridItem>
              </Grid>

              <Modal size="2xl" isOpen={isOpenLocks} onClose={onCloseLocks}>
                <ModalOverlay />
                <ModalContent bg="black" color="white">
                  <ModalHeader>Manage Locks</ModalHeader>
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

                    <Table size="sm" variant="simple" mb="8">
                      <Thead>
                        <Tr>
                          <Th color="white" pb="2">
                            Date
                          </Th>
                          <Th color="white" pb="2">
                            Amount
                          </Th>
                          <Th color="white" pb="2">
                            Lock-up Duration
                          </Th>
                          <Th color="white" pb="2" isNumeric>
                            Power
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td py="4">
                            2/2/22
                          </Td>
                          <Td>
                            1,000 SNX
                          </Td>
                          <Td>
                            1 year
                            <Button colorScheme="blue" ml="2" size="xs">Unlock</Button>
                            <Button colorScheme="blue" ml="2" size="xs">Extend Lock</Button>
                          </Td>
                          <Td isNumeric>10,000</Td>
                        </Tr>
                      </Tbody>
                    </Table>

                    <Heading mb="2" size="md">Lock SNX</Heading>

                    <Grid mb="8" templateColumns='repeat(3, 1fr)' gap={4}>
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
                  </ModalBody>
                </ModalContent>
              </Modal>
            </GridItem>
          </Grid>

          <Heading size="md" mb="1">Staking Position</Heading>
          <Text fontSize="sm" mb="4">
            Your staking position effects your rewards/fees APY as well as how your c-ratio fluctuates. You’re currently enabling the creation of the following synthetic assets:
          </Text>

          <Position />

          <Heading size="sm" mb="1">Hedging Your Staking Position</Heading>
          <Text fontSize="sm" mb="12">If you’re concerned about maintaining your c-ratio, you can hedge your debt position. To become fully hedged, hold your position of your staked value in each of the assets above or their non-synthetic equivalent. (For example, if you have $2,000 staked and a 50% position on sBTC, you would hold $1,000 BTC.) These assets will change in value by the amount that you need to restore your c-ratio to its current value.</Text>

        </Box>
      </Container >
    </Box >
  )
}
