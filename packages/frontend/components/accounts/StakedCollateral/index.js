import NextLink from "next/link"
import {
  Box,
  Heading,
  Text,
  Link,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
  Flex,
  Input,
  Badge,
  Tooltip
} from '@chakra-ui/react'
import { EditIcon, WarningIcon, QuestionOutlineIcon } from '@chakra-ui/icons'

export default function StakedCollateral() {
  const { isOpen: isOpenFund, onOpen: onOpenFund, onClose: onCloseFund } = useDisclosure()
  const { isOpen: isOpenDebt, onOpen: onOpenDebt, onClose: onCloseDebt } = useDisclosure()

  return (
    <Box>
      <Heading size="md" mb="2">Staking Positions</Heading>

      <Table size="sm" variant="simple" mb="9">
        <Thead>
          <Tr>
            <Th color="rgba(255,255,255,0.8)" pb="2">
              Collateral
            </Th>
            <Th color="rgba(255,255,255,0.8)" pb="2">
              Debt
            </Th>
            <Th color="rgba(255,255,255,0.8)" pb="2">
              C-Ratio
            </Th>
            <Th color="rgba(255,255,255,0.8)" pb="2">
              Fund
            </Th>
            {/*
              <Th color="rgba(255,255,255,0.8)" pb="2">
                Lock
              </Th>
              */}
            <Th color="rgba(255,255,255,0.8)" pb="2">
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td py="4">
              $5,264.34
              <Text fontSize="xs" opacity="0.66" mt="1'">1,000 SNX</Text>
            </Td>
            <Td py="4">
              $3,200
              <Text fontSize="xs" mt="1'">
                <Link
                  _hover={{ textDecoration: "none" }}
                  onClick={onOpenDebt}
                  display="inline"
                  color="blue.500"
                >
                  Manage Debt
                </Link>
              </Text>
            </Td>
            <Td py="4">
              400%
              <Text fontSize="xs" opacity="0.66" mt="1'">{/*target here as well?*/}300% Min.</Text>
            </Td>
            <Td>
              <NextLink href={"/funds/example"} passHref>
                <Link _hover={{ textDecoration: 'none' }} display="inline" borderBottom="1px dotted rgba(255,255,255,0.5)">Spartan Council</Link>
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
              $1,000.00
              <Text fontSize="xs" opacity="0.66" mt="1'">1,000 LUSD</Text>
            </Td>
            <Td py="4">
              $3,200
              <Text fontSize="xs" mt="1'">
                <Link
                  _hover={{ textDecoration: "none" }}
                  onClick={onOpenDebt}
                  display="inline"
                  color="blue.500"
                >
                  Manage Debt
                </Link>
              </Text>
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
                <Text opacity="0.66" display="inline">None</Text><Link color="blue.400" ml="1">
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

      <Modal size="2xl" isOpen={isOpenDebt} onClose={onCloseDebt}>
        <ModalOverlay />
        <ModalContent bg="black" color="white">
          <ModalHeader>Manage Debt</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb="8">
              <Heading fontSize="lg" mb="1">You have $3,200 of debt associated with this collateral.</Heading>
              <Text>You have $9,600 of collateral associated with this debt, giving you a C-Ratio of 300%. The value of your collateral fluctates with market conditions. <em>If your C-Ratio drops below 200% you may be liquidated and lose your collateral.</em></Text>
            </Box>

            <Box mb="8">
              <Heading fontSize="lg" mb="1">$1,200 of this debt has been accrued from the <Text borderBottom="1px dotted rgba(255,255,255,0.8)" display="inline">Spartan Council</Text> fund.</Heading>
              <Text>This will fluctuate depending on the markets where this fund has allocated liquidity.</Text>
            </Box>

            <Box mb="4">
              <Heading fontSize="lg" mb="4">$2,000 of this debt has been accrued from minting and burning sUSD.</Heading>
              <SimpleGrid columns={2} spacing={4}>
                <Box>
                  <Heading fontSize="md" mb="1">Mint sUSD</Heading>
                  <Text fontSize="sm" mb="1">Increase your debt and harm your C-Ratio.</Text>

                  <Box bg="gray.900" mb="2" p="6" pb="4" borderRadius="12px">
                    <form>
                      <Flex mb="3">
                        <Input
                          flex="1"
                          type="number"
                          border="none"
                          placeholder="0.0"
                          value={null}
                          onChange={(e) => {
                            null
                          }}
                        />
                        <Button
                          isLoading={null}
                          isDisabled={null}
                          colorScheme="blue"
                          ml="4"
                          px="8"
                          type="submit"
                        >
                          Mint
                        </Button>
                      </Flex>
                    </form>
                    <Flex alignItems="center">
                      <Box mr="auto">
                        <Text fontSize="xs">
                          Max Mint: $1,200
                          <Tooltip label="You can't mint sUSD that takes your C-Ratio below the target c-ratio of 300%."><QuestionOutlineIcon
                            transform="translateY(-1.5px)" ml="1" /></Tooltip>
                        </Text>
                      </Box>
                      <Link>
                        <Badge
                          as="button"
                          ml="3"
                          variant="outline"
                          colorScheme="blue"
                          transform="translateY(-2px)"
                        >
                          Use Max
                        </Badge>
                      </Link>
                    </Flex>
                  </Box>
                  <Text fontSize="sm">This is effectively taking out a zero-interest loan against your collateral.</Text>
                </Box>

                <Box>
                  <Heading fontSize="md" mb="1">Burn sUSD</Heading>
                  <Text fontSize="sm" mb="1">Reduce your debt and improve your C-Ratio.</Text>

                  <Box bg="gray.900" mb="2" p="6" pb="4" borderRadius="12px">
                    <form>
                      <Flex mb="3">
                        <Input
                          flex="1"
                          type="number"
                          border="none"
                          placeholder="0.0"
                          value={null}
                          onChange={(e) => {
                            null
                          }}
                        />
                        <Button
                          isLoading={null}
                          isDisabled={null}
                          colorScheme="blue"
                          ml="4"
                          px="8"
                          type="submit"
                        >
                          Burn
                        </Button>
                      </Flex>
                    </form>
                    <Flex alignItems="center">
                      <Box mr="auto">
                        <Text fontSize="xs">
                          Balance: $2,000
                        </Text>
                      </Box>
                      <Link>
                        <Badge
                          as="button"
                          ml="3"
                          variant="outline"
                          colorScheme="blue"
                          transform="translateY(-2px)"
                        >
                          Use Max
                        </Badge>
                      </Link>
                    </Flex>
                  </Box>
                  <Text fontSize="sm">You can purchase sUSD from most major exchanges like <Link display="inline" _hover={{ textDecoration: "none" }} borderBottom="1px dotted rgba(255,255,255,0.5)">one we like</Link>.</Text>
                </Box>
              </SimpleGrid>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

    </Box>
  )
}
