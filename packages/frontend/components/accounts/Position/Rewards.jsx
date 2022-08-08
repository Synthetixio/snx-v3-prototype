import { Box, Heading, Text, Flex, Button } from "@chakra-ui/react";

export default function Rewards() {
  return (
    <Box>
      <Heading size="md" mb="1">
        Claim Rewards
      </Heading>
      <Text fontSize="sm" mb="2">
        Rewards incentivize stakers to back synthetic assets.
      </Text>

      <Flex alignItems="center" borderBottom="1px solid white" mb="3" pb="3">
        3.2343 SNX
        <Box ml="auto">
          <Button colorScheme="blue" size="xs">
            Withdraw
          </Button>
          <Button ml="2" colorScheme="blue" size="xs">
            Restake
          </Button>
        </Box>
      </Flex>
      <Flex alignItems="center" borderBottom="1px solid white" mb="3" pb="3">
        0.00034 ETH
        <Box ml="auto">
          <Button colorScheme="blue" size="xs">
            Withdraw
          </Button>
          <Button ml="2" colorScheme="blue" size="xs">
            Restake
          </Button>
        </Box>
      </Flex>
      <Flex alignItems="center" borderBottom="1px solid white" mb="3" pb="3">
        0.003 LUSD
        <Box ml="auto">
          <Button colorScheme="blue" size="xs">
            Withdraw
          </Button>
          <Button ml="2" colorScheme="blue" size="xs">
            Restake
          </Button>
        </Box>
      </Flex>
      <Flex alignItems="center" mb="8">
        <Box ml="auto">
          <Button colorScheme="blue" size="xs">
            Withdraw All{" "}
          </Button>
          <Button ml="2" colorScheme="blue" size="xs">
            Restake All
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
