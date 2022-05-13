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
} from '@chakra-ui/react'
import { EditIcon, WarningIcon } from '@chakra-ui/icons'

export default function StakedCollateral() {
  const { isOpen: isOpenFund, onOpen: onOpenFund, onClose: onCloseFund } = useDisclosure()
  const { isOpen: isOpenLock, onOpen: onOpenLock, onClose: onCloseLock } = useDisclosure()

  return (
    <Box>
      <Heading size="md" mb="2">Staked Collateral</Heading>

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
    </Box>
  )
}
