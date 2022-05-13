import Head from 'next/head'
import NextLink from "next/link"
import { Container, Box, Text, Flex, Link } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import Permissions from '../../../components/accounts/Permissions/index'

export default function Settings() {
  return (
    <Box>
      <Head>
        <title>Account Settings</title>
        <meta name="description" content="Account Settings" />
      </Head>
      <Container maxW='container.sm'>
        <Flex mb="6" alignItems="center">
          <Text fontWeight="semibold" fontSize="md">Account #1324</Text>
          <NextLink href={"/accounts/example"} passHref>
            <Link ml="auto" fontSize="xs" fontWeight="normal" color="blue.400"><ChevronLeftIcon transform="translateY(-1px)" /> Return to overview</Link>
          </NextLink>
        </Flex>
        <Permissions />
      </Container >
    </Box >
  )
}
