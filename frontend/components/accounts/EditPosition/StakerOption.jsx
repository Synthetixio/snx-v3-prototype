import { Heading, Box, Text, Flex, Radio, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export default function StakerOption({ name, defaultChecked }) {
  return (
    <Flex
      alignItems="center"
      mb="2.5"
      pb="2.5"
      borderBottom="1px solid rgba(255,255,255,0.3)"
    >
      <Box>
        <Radio
          size="lg"
          name={name}
          colorScheme="orange"
          defaultChecked={defaultChecked}
        />
      </Box>
      <Box flex="1" pl="3">
        <Heading size="sm" mb="0.5">
          {name}&nbsp;
          <NextLink href={"/accounts/example"} passHref>
            <Link
              color="blue.400"
              d="inline-block"
              transform="translateY(-2.5px)"
            >
              <ExternalLinkIcon />
            </Link>
          </NextLink>
        </Heading>
        <Text fontSize="xs" d="block" color="gray.400">
          0x6991cf5a96d8c6e5802e92fb5e329e0d0ddd701f
        </Text>
      </Box>
      <Box pl="4">
        <Text fontSize="xs">
          Projected Rewards: <strong>20% APY</strong> (SNX)
        </Text>
        <Text fontSize="xs">
          Projected Fees: <strong>20% APY</strong> (sUSD)
        </Text>
      </Box>
    </Flex>
  );
}