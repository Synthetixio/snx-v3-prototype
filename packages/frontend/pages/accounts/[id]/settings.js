import Head from 'next/head'
import Subnav from '../../../components/accounts/Subnav/index'
import { Container, Box } from '@chakra-ui/react'
import Permissions from '../../../components/accounts/Permissions/index'

export default function Settings() {
  return (
    <Box>
      <Head>
        <title>Account Settings</title>
        <meta name="description" content="Account Settings" />
      </Head>
      <Container maxW='container.sm'>
        <Subnav />
        <Permissions />
      </Container >
    </Box >
  )
}
