import Head from 'next/head'
import { useState } from 'react';
import { Container, Box, Heading, Text, Link, Input, Flex, Button, Tabs, TabList, TabPanels, Tab, TabPanel, Radio } from '@chakra-ui/react'
import { InfoOutlineIcon, ExternalLinkIcon } from '@chakra-ui/icons'

export default function Dao() {
  const [easyMode, setEasyMode] = useState(true);

  return (
    <Box>
      <Head>
        <title>DAO</title>
        <meta name="description" content="DAO" />
      </Head>
      <Container maxW='container.sm'>
        <Box>
          <Heading size="md" mb="3" mr="auto">DAO</Heading>

          Vote here etc.
        </Box>
      </Container >
    </Box >
  )
}
