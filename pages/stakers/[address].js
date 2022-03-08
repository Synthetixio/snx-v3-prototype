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
  Divider,
  Link
} from '@chakra-ui/react'
import Position from '../../components/stakers/Position/index'
import EditPosition from '../../components/stakers/EditPosition/index'
import { EditIcon, InfoOutlineIcon } from '@chakra-ui/icons'

export default function Synth() {
  // If the connect wallet doesn’t own this LP token, remove the c-ratio maintenance component, unstake component, and hedging component. The edit component should be a read component and add a button that opens the edit ui when the connect wallet owns the LP token. Also, editable version here for easy mode need to be rethought. Also, informing the user how changing their position will effect the c-ratio and rewards. This whole view probably needs and advanced mode to handle burning on a per pool basis.

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box>
      <Head>
        <title>Staker</title>
        <meta name="description" content="Staker" />
      </Head>
      <Container maxW='container.sm'>
        <Box>
          <Text opacity="0.6" fontSize="sm">snxStake Token Address</Text>
          <Heading size="md" mb="1" mr="auto">0x80d65Bb7b9436A86c1928F93D6E7cc186987Ac54</Heading>
          <Text mb="6" fontSize="sm" fontWeight="semibold">Owner: 0x80d65Bb7b9436A86c1928F93D6E7cc186987Ac54</Text>

          <Grid mb="3" textAlign="center" templateColumns='repeat(4, 1fr)' gap={6}>
            <GridItem mb="3">
              <Text fontSize="sm" fontWeight="semibold">Staked</Text>
              <Heading size="lg">$5,000</Heading>
              <Text opacity="0.6" fontSize="sm">1,000 SNX</Text>
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

            <Grid mb="3" templateColumns='repeat(2, 1fr)' gap={3}>
              <GridItem mb="3">
                <Heading size="sm" mb="1">Increase Your Stake</Heading>
                <Text fontSize="xs" mb="1">Provide more collateral to the system.</Text>
                <em>Form here accepts anything and will trade for SNX via 1inch</em>
              </GridItem>
              <GridItem mb="3">
                <Heading size="sm" mb="1">Burn Synths</Heading>
                <Text fontSize="xs" mb="1">Reduce the amount of synths in circulation.</Text>
                <em>Form here accepts anything and will trade for sUSD via 1inch</em>
              </GridItem>
            </Grid>

            <Text fontSize="xs">Something about c-ratio notification system here.</Text>
          </Box>

          <Text fontSize="lg" mb="8">You’ve earned a total of <strong>$2,230</strong> in exchange fees. <Tooltip label="Your fees, earned when the synths in your staking position are exchanged, are automatically included in your staking position. This passively improves the rewards you're earning. You can retrieve the earned fees by minting sUSD."><InfoOutlineIcon
            transform="translateY(-2px)" /></Tooltip></Text>

          <Grid mb="8" templateColumns='repeat(2, 1fr)' gap={8}>
            <GridItem mb="4">
              <Heading size="md" mb="1">Claim Rewards</Heading>
              <Text fontSize="sm" mb="2">SNX rewards incentivize stakers to include various pools in their staking position. You can
                {" "}<NextLink href={"/dao"} passHref>
                  <Link fontWeight="semibold" color="blue.400">
                    vote
                  </Link>
                </NextLink> on how they should be distributed.</Text>
              <Button size="sm" colorScheme="blue" mb="2">Claim 1,200 SNX</Button>
            </GridItem>
            <GridItem mb="4">
              <Heading size="md" mb="1">Lock SNX</Heading>
              <Text fontSize="sm" mb="2">Receive greater rewards, fees, and voting power by locking your SNX tokens as staked. This scales up the longer you lock.</Text>
              <Button size="sm" colorScheme="blue">Manage Token Locks</Button>
            </GridItem>
          </Grid>

          <Flex mb="2">
            <Heading size="md" mb="1">Staking Position</Heading>
            <Button size="xs" colorScheme="green" ml="auto" onClick={onOpen}><EditIcon mr="1.5" />Edit</Button>

            <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent bg="black" color="white">
                <ModalHeader>Modify Staking Position</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <EditPosition />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Flex>

          <Text fontSize="sm" mb="4">
            Your staking position effects your rewards/fees APY as well as how your c-ratio fluctuates. You’re currently enabling the creation of the following synthetic assets:
          </Text>

          <Position />

          <Heading size="sm" mb="1">Hedging Your Staking Position</Heading>
          <Text fontSize="sm" mb="12">Short explainer, instructing how to read the component above.</Text>

          <Grid mb="4" templateColumns='repeat(2, 1fr)' gap={8}>
            <GridItem mb="4">
              <Heading size="md" mb="1">Unstake</Heading>
              <Text fontSize="sm" mb="2">Burn synths to redeem your SNX tokens</Text>
              <Text mb="8"><em>Form here</em></Text>
            </GridItem>
            <GridItem mb="4">
              <Heading size="md" mb="1">Mint More sUSD</Heading>
              <Text fontSize="sm" mb="2"><strong>This will reduce your c-ratio.</strong></Text>
              <Text mb="8"><em>Form here</em></Text>
            </GridItem>
          </Grid>

        </Box>
      </Container >
    </Box >
  )
}
