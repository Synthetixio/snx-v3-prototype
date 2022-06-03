import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Text,
  Input,
  Flex,
  InputGroup,
  InputRightAddon,
  Link,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';

export default function SynthOption({ name, ticker }) {
  return (
    <Box borderBottom="1px solid rgba(255,255,255,0.3)" pb="4" mb="4">
      <Flex alignItems="center">
        <Box textAlign="center">
          <Image
            alt="placeholder"
            src="https://place-hold.it/48x48"
            borderRadius={24}
            marginTop={4}
          />
          <Text mt="1" fontSize="xs" opacity="0.5">
            {ticker}
          </Text>
        </Box>
        <Box flex="1" pl="4">
          <Heading size="sm" mb="0.5">
            {name}&nbsp;
            <NextLink href={'/synths/example'} passHref>
              <Link color="blue.400">
                <ExternalLinkIcon />
              </Link>
            </NextLink>
          </Heading>
          <Text fontSize="xs">
            Projected Rewards: <strong>20% APY</strong> (SNX)
          </Text>
          <Text fontSize="xs">
            Projected Fees: <strong>20% APY</strong> (sUSD)
          </Text>
        </Box>
        <Box pl="4">
          <Text fontSize="xs" mb="1" opacity="0.6">
            Position
          </Text>
          <InputGroup size="sm">
            <Input htmlSize={4} width="auto" defaultValue="100" />
            <InputRightAddon color="black">%</InputRightAddon>
          </InputGroup>
        </Box>
      </Flex>
    </Box>
  );
}
