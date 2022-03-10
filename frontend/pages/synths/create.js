import Head from 'next/head'
import Router from 'next/router'
import { Container, Box, Heading, FormControl, Input, FormLabel, FormHelperText, SimpleGrid, Button, Text, InputGroup, InputRightAddon } from '@chakra-ui/react'

export default function Create() {

  return (
    <Box>
      <Head>
        <title>Create a Synth</title>
        <meta name="description" content="Create a Synth" />
      </Head>
      <Container maxW='container.sm'>
        <Box>
          <Heading size="md" mb="4" mr="auto">Create Synth</Heading>
          <SimpleGrid columns={4} spacing={4}>

            <FormControl mb="6">
              <FormLabel htmlFor='name'>Name</FormLabel>
              <Input id='name' type='name' />
            </FormControl>
            <FormControl mb="6">
              <FormLabel htmlFor='ticker'>Ticker</FormLabel>
              <Input id='ticker' type='ticker' />
            </FormControl>
            <FormControl mb="6">
              <FormLabel htmlFor='icon'>Icon URI</FormLabel>
              <Input id='icon' type='icon' />
            </FormControl>
            <FormControl mb="6">
              <FormLabel htmlFor='category'>Category</FormLabel>
              <Input id='category' type='category' />
            </FormControl>
          </SimpleGrid>

          <FormControl mb="6">
            <FormLabel htmlFor='priceFeed'>Price Feed Contract Address</FormLabel>
            <Input id='priceFeed' type='priceFeed' />
            <FormHelperText>This contract must implement the Synthetix Price Feed Interface. <u>Review the documentation</u></FormHelperText>
          </FormControl>
          <Heading size="sm" mb="2">Collateralization</Heading>
          <FormControl mb="6">
            <FormLabel htmlFor='minCRatio'>Minimum C-Ratio</FormLabel>
            <InputGroup>
              <Input id='minCRatio' defaultValue="100" min="100" type="number" />
              <InputRightAddon color="black">%</InputRightAddon>
            </InputGroup>
            <FormHelperText>Stakers can be liquidated if their c-ratio drops below this amount.</FormHelperText>
          </FormControl>
          <Heading size="sm" mb="2">Fee Structure</Heading>
          <Text mb="2">Checkbox for flat fee</Text>
          <Text mb="2">Checkbox for Dynamic Exchange Fee</Text>
          <Text mb="2">Checkbox for simulated liquidity</Text>
          <Text mb="2">Plug in your own fee contract</Text>
          <Text mb="4">Choose beneficiaries for fee distribution? e.g. pool creator takes 10% of the flat fee and stakers get 100% of the dynamic exchange fee? How does referral partner fee plug in here?</Text>

          <Button
            w="100%"
            size="lg"
            colorScheme="blue"
            mb="1"
            onClick={() => {
              Router.push("/synths/example");
            }}
          >
            Create Synth
          </Button>
        </Box>
      </Container >
    </Box >
  )
}
