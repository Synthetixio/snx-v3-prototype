import NextLink from "next/link";
import {
  Flex,
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
import { ExternalLinkIcon, InfoOutlineIcon } from "@chakra-ui/icons";

export default function Position() {
  return (
    <Box mb="8">
      <Table size="sm" variant="simple">
        <TableCaption color="white">
          <InfoOutlineIcon d="inline-block" transform="translateY(-1px)" /> Your
          staking position is currently managed by{" "}
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
              Minimum C-Ratio
            </Th>
            <Th color="white" pb="2" isNumeric>
              Fees APY
            </Th>
            <Th color="white" pb="2" isNumeric>
              Rewards APY
            </Th>
            <Th color="white" pb="2" isNumeric>
              Position
            </Th>
            <Th color="white" pb="2" isNumeric>
              Maximum Exposure
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
                    d="inline-block"
                    transform="translateY(-1px)"
                  >
                    <ExternalLinkIcon />
                  </Link>
                </NextLink>
              </Text>
            </Td>
            <Td isNumeric fontSize="lg">
              250%
            </Td>
            <Td isNumeric>
              25.4%
              <Text fontSize="xs" opacity="0.8">
                sUSD
              </Text>
            </Td>
            <Td isNumeric>
              70.4%
              <Text fontSize="xs" opacity="0.8">
                SNX
              </Text>
            </Td>
            <Td isNumeric fontSize="lg">
              100%
            </Td>
            <Td isNumeric>
              10
              <Text fontSize="xs" opacity="0.8">
                sBTC
              </Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}
