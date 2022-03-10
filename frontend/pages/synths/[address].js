import Head from 'next/head'
import NextLink from "next/link";
import { Container, Box, Heading, Text, Link, Input, Flex, Button, Tabs, TabList, TabPanels, Tab, TabPanel, Radio } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export default function Synth() {
  return (
    <Box>
      <Head>
        <title>Synth</title>
        <meta name="description" content="Synth" />
      </Head>
      <Container maxW='container.sm'>
        <Box>
          <Heading size="md" mb="3" mr="auto">Name of synth</Heading>
          more info here like ERC20 address, trading volume, charts, etc. Link to Kwenta/1inch to buy some.
        </Box>

        <Flex mt="8">
          <NextLink href={"/synths/create"} passHref><Button size="xs" colorScheme="green"><AddIcon w="2" h="2" />&nbsp;&nbsp;Create a synth</Button></NextLink>
        </Flex>
      </Container >
    </Box >
  )
}
