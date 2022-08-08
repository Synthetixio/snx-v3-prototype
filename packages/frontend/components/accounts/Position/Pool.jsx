import { ExternalLinkIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Text,
  Box,
  Link,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function Position() {
  return (
    <Box mb="2">
      <Heading size="md" mb="1">
        Staking Position
      </Heading>
      <Text fontSize="sm" mb="4">
        Your staking position effects your rewards/fees APY as well as how your
        c-ratio fluctuates. You’re currently enabling the creation of the
        following synthetic assets:
      </Text>

      <Table size="sm" variant="simple">
        <TableCaption color="white">
          {/* if only staking with spartan council fund */}
          <InfoOutlineIcon
            display="inline-block"
            transform="translateY(-1px)"
          />{" "}
          Your staking position is currently managed by{" "}
          <NextLink href={"/dao"} passHref>
            <Link fontWeight="semibold" color="blue.400">
              The Spartan Council
            </Link>
          </NextLink>{" "}
          and is subject to change.
        </TableCaption>
        <Thead>
          <Tr>
            <Th color="white" pb="2">
              Asset
            </Th>
            <Th color="white" pb="2">
              Fees APY
            </Th>
            <Th color="white" pb="2">
              Rewards APY
            </Th>
            <Th color="white" pb="2">
              Position
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td py="4">
              <Heading size="sm">Synthetic&nbsp;Bitcoin</Heading>
              <Text mt="1" fontSize="xs">
                <span style={{ opacity: 0.8 }}>sBTC</span>
                <NextLink href={"/synths/example"} passHref>
                  <Link
                    color="blue.400"
                    ml="1"
                    display="inline-block"
                    transform="translateY(-1px)"
                  >
                    <ExternalLinkIcon />
                  </Link>
                </NextLink>
              </Text>
            </Td>
            <Td>
              25.4%
              <Text fontSize="xs" opacity="0.8">
                sUSD
              </Text>
            </Td>
            <Td>
              70.4%
              <Text fontSize="xs" opacity="0.8">
                SNX
              </Text>
            </Td>
            <Td fontSize="lg">100%</Td>
          </Tr>
        </Tbody>
      </Table>

      <Heading size="sm" mb="1">
        Hedging Your Staking Position
      </Heading>
      <Text fontSize="sm" mb="12">
        If you’re concerned about maintaining your C-Ratio, you can hedge your
        staking position. To become fully hedged, hold your position of your
        staked value in each of the assets above or their non-synthetic
        equivalent. (For example, if you have $2,000 staked and a 50% position
        on sBTC, you would hold $1,000 BTC.) These assets will change in value
        by the amount that you would need to restore your C-Ratio to its current
        value.
      </Text>
    </Box>
  );
}
