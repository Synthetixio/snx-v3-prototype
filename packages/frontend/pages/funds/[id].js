import Head from 'next/head'
import NextLink from "next/link";
import { Container, Tag, Tooltip, Box, Heading, Text, Flex, Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import Position from '../../components/accounts/Position/index'
import { useRouter } from "next/router";

export default function Fund() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box>
      <Head>
        <title>Fund</title>
        <meta name="description" content="Fund" />
      </Head>
      <Container maxW='container.sm'>
        <Box>
          {/*
          <Tooltip label='This synth has been verified by the Spartan Council'>
            <Tag mb="4" mr="2" colorScheme="green" size="sm">Verified</Tag>
          </Tooltip>
          */}
          <Flex mb="6" flexDirection="column">
            <Text color="gray.400">
              Fund #{id}
            </Text>
            {/*<Heading size="lg" mr="auto" lineHeight="1.2">Spartan Council</Heading>*/}
          </Flex>
          {/*
          <Heading size="md" mb="3">Market Allocation</Heading>
          <Box mb="8">
            <Position />
          </Box>

          <Heading size="md" mb="1">Collateral</Heading>

          <TableContainer mb={12}>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th color="white">Asset</Th>
                  <Th color="white">Amount</Th>
                  <Th color="white" isNumeric>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Synthetix Tokens</Td>
                  <Td>
                    2,000 SNX
                  </Td>
                  <Td isNumeric>$10,000</Td>
                </Tr>
                <Tr>
                  <Td>LUSD Stablecoin</Td>
                  <Td>
                    343,403 LUSD
                  </Td>
                  <Td isNumeric>$343,403</Td>
                </Tr>
                <Tr>
                  <Td>Ether</Td>
                  <Td>
                    2.5 ETH
                  </Td>
                  <Td isNumeric>$8,750</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
  */}
          {/* controlling account? delegated accounts? collateral value over time? */}

        </Box>
        {/*
        <Flex mt="8">
          <NextLink href={"/funds/create"} passHref><Button size="xs" colorScheme="green"><AddIcon w="2" h="2" />&nbsp;&nbsp;Create a Fund</Button></NextLink>
        </Flex>
        */}
      </Container >
    </Box >
  )
}
