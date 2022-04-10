import Head from 'next/head'
import NextLink from "next/link";
import { Container, Tag, Grid, GridItem, Tooltip, Box, Heading, Text, Flex, Link, Button, UnorderedList, ListItem, StatGroup, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { Line } from 'react-chartjs-2';
const { faker } = require('@faker-js/faker');
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend
);

const options1 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data1 = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.datatype.number({ min: 38000, max: 45000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const data2 = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const supplyTotals = labels.map(() => faker.datatype.number({ min: 1800000, max: 2000000 }))
console.log(supplyTotals)
const data3 = {
  labels,
  datasets: [
    {
      label: 'Total Supply',
      data: supplyTotals,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Supply Target',
      data: supplyTotals.map((d) => d + faker.datatype.number({ min: 200000, max: 400000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function Synth() {
  return (
    <Box>
      <Head>
        <title>Synth</title>
        <meta name="description" content="Synth" />
      </Head>
      <Container maxW='container.sm'>
        <Box>
          <Tooltip label='This synth has been verified by the Spatan Council'>
            <Tag mb="4" mr="2" colorScheme="green" size="sm">Verified</Tag>
          </Tooltip>
          <Tag opacity="0.66" mb="4" colorScheme="gray" size="sm" bg="black" border="1px solid white" color="white">Crypto</Tag>
          <Flex alignItems="center" mb="6">
            <Box w="64px" h="64px" borderRadius="32px" overflow="hidden" mr="3">
              <img width="64" height="64" src="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png" />
            </Box>
            <Flex flexDirection="column">
              <Heading size="lg" mr="auto" lineHeight="1.2">sBTC</Heading>
              <Text color="gray.400">
                Synthetic Bitcoin
                <Link d="inline-block" opacity="0.66" ml="2"><Tooltip label='View Synth Contract on Tenderly'><img width="12" height="12" src="/tenderly.svg" /></Tooltip></Link>
                <Link d="inline-block" opacity="0.66" ml="2"><Tooltip label='View Synth Contract on Etherscan'><img width="12" height="12" src="/etherscan.svg" /></Tooltip></Link>
              </Text>
            </Flex>
          </Flex>

          <Grid templateColumns='repeat(2, 1fr)' gap={6}>
            <GridItem mb={6}>
              <Stat>
                <StatLabel>
                  Price
                  <Link d="inline-block" opacity="0.66" ml="2"><Tooltip label='View Price Contract on Tenderly'><img width="10" height="10" src="/tenderly.svg" /></Tooltip></Link>
                  <Link d="inline-block" opacity="0.66" ml="2"><Tooltip label='View Price Contract on Etherscan'><img width="10" height="10" src="/etherscan.svg" /></Tooltip></Link>
                </StatLabel>
                <StatNumber>$42,231.23</StatNumber>
                <StatHelpText>
                  <StatArrow type='increase' />
                  3%
                </StatHelpText>
              </Stat>
              <Line
                options={options1}
                data={data1}
              />
            </GridItem>
            <GridItem mb={6}>
              <Stat>
                <StatLabel>
                  Exchange Volume
                  <Link d="inline-block" opacity="0.66" ml="2"><Tooltip label='View Market Contract on Tenderly'><img width="10" height="10" src="/tenderly.svg" /></Tooltip></Link>
                  <Link d="inline-block" opacity="0.66" ml="2"><Tooltip label='View Market Contract on Etherscan'><img width="10" height="10" src="/etherscan.svg" /></Tooltip></Link>
                </StatLabel>
                <StatNumber>$240,342.23</StatNumber>
                <StatHelpText>
                  <StatArrow type='decrease' />
                  1.2%
                </StatHelpText>
              </Stat>
              <Line
                options={options1}
                data={data2}
              />
            </GridItem>
          </Grid>

          {/* or do combo price with bar chart on bottom for exchange volume, above */}

          <Heading size="md" mb={2}>Liquidity</Heading>
          <Line
            options={options2}
            data={data3}
          />

          <Heading size="sm" mt="6" mt={6} mb={1}>Liquidity Providers</Heading>

          <TableContainer mb={12}>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Chain</Th>
                  <Th>Account</Th>
                  <Th isNumeric>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Optimism</Td>
                  <Td>
                    #254
                    <Text ml={2} d="inline" fontSize="xs" color="gray.500">Delegated to #123</Text>
                  </Td>
                  <Td isNumeric>$123,321.43</Td>
                </Tr>
                <Tr>
                  <Td>Arbitrum</Td>
                  <Td>
                    #24
                  </Td>
                  <Td isNumeric>$107,429.53</Td>
                </Tr>
                <Tr>
                  <Td>Optimism</Td>
                  <Td>
                    #854
                    <Text ml={2} d="inline" fontSize="xs" color="gray.500">Delegated to #123</Text>
                  </Td>
                  <Td isNumeric>$93,704.31</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          {/*think more about multichain, incorporate into path? source of truth for multichain, etc. */}

          <Box mb="6">
            <Heading
              size="xs"
              mb="1"
              textTransform="uppercase"
              fontWeight="300"
              letterSpacing="1.5px"
            >
              Creator
            </Heading>

            <Text>
              0x07aeeb7e544a070a2553e142828fb30c214a1f86
              <Link d="inline-block" opacity="0.66" ml="2"><Tooltip label='View Market Contract on Tenderly'><img width="12" height="12" src="/tenderly.svg" /></Tooltip></Link>
              <Link d="inline-block" opacity="0.66" ml="2"><Tooltip label='View Market Contract on Etherscan'><img width="12" height="12" src="/etherscan.svg" /></Tooltip></Link>
            </Text>
          </Box>

          <Box mb="6">
            <Heading
              size="xs"
              mb="1"
              textTransform="uppercase"
              fontWeight="300"
              letterSpacing="1.5px"
            >
              Fee Contracts
            </Heading>

            <Text>
              0x07aeeb7e544a070a2553e142828fb30c214a1f86
              <Link d="inline-block" opacity="0.66" ml="2"><Tooltip label='View Market Contract on Tenderly'><img width="12" height="12" src="/tenderly.svg" /></Tooltip></Link>
              <Link d="inline-block" opacity="0.66" ml="2"><Tooltip label='View Market Contract on Etherscan'><img width="12" height="12" src="/etherscan.svg" /></Tooltip></Link>
            </Text>
            <Text>
              0x07aeeb7e544a070a2553e142828fb30c214a1f86
              <Link d="inline-block" opacity="0.66" ml="2"><Tooltip label='View Market Contract on Tenderly'><img width="12" height="12" src="/tenderly.svg" /></Tooltip></Link>
              <Link d="inline-block" opacity="0.66" ml="2"><Tooltip label='View Market Contract on Etherscan'><img width="12" height="12" src="/etherscan.svg" /></Tooltip></Link>
            </Text>
            <Text>
              0x07aeeb7e544a070a2553e142828fb30c214a1f86
              <Link d="inline-block" opacity="0.66" ml="2"><Tooltip label='View Market Contract on Tenderly'><img width="12" height="12" src="/tenderly.svg" /></Tooltip></Link>
              <Link d="inline-block" opacity="0.66" ml="2"><Tooltip label='View Market Contract on Etherscan'><img width="12" height="12" src="/etherscan.svg" /></Tooltip></Link>
            </Text>
          </Box>
        </Box>

        <Flex mt="8">
          <NextLink href={"/synths/create"} passHref><Button size="xs" colorScheme="green"><AddIcon w="2" h="2" />&nbsp;&nbsp;Create a synth</Button></NextLink>
        </Flex>
      </Container >
    </Box >
  )
}
