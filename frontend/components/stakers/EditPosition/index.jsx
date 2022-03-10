import {
  Box,
  Heading,
  Text,
  Input,
  Flex,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Radio,
  RadioGroup,
  Spacer,
} from "@chakra-ui/react";
import Router from "next/router";
import StakerOption from "./StakerOption";
import SynthOption from "./SynthOption";
import { useState } from "react";

export default function Position() {
  const [delegate, setDelegate] = useState("1");

  return (
    <Box>
      <Tabs isFitted>
        <TabList>
          <Tab>Delegated Staking</Tab>
          <Tab>Manual Staking</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RadioGroup onChange={setDelegate} value={delegate}>
              <StakerOption name="Spartan Council" defaultChecked={true} />
              <StakerOption name="Forex" />
              <StakerOption name="Commodities" />

              <Flex mb="2" pt="1">
                <Box pt="2">
                  <Radio size="lg" name="custom" colorScheme="orange" />
                </Box>
                <Box flex="1" pl="3">
                  <Heading size="sm" mb="0.5">
                    Custom
                  </Heading>
                  <Text fontSize="xs" d="block" color="gray.400">
                    Follow the staking position of another snxStake token.
                  </Text>
                  {delegate == "custom" && (
                    <Box>
                      <Text opacity="0.6" fontSize="sm" mt="1.5" mb="1">
                        snxStake Token Address
                      </Text>
                      <Input size="sm" />
                    </Box>
                  )}
                </Box>
              </Flex>
            </RadioGroup>
          </TabPanel>
          <TabPanel>
            <Heading
              size="xs"
              mb="3"
              textTransform="uppercase"
              fontWeight="300"
              letterSpacing="1.5px"
            >
              Crypto
            </Heading>
            <SynthOption ticker="sBTC" name="Synthetic Bitcoin" />
            <SynthOption ticker="sETH" name="Synthetic Ether" />
            <SynthOption ticker="sSOL" name="Synthetic Solana" />
            <Heading
              size="xs"
              mb="3"
              textTransform="uppercase"
              fontWeight="300"
              letterSpacing="1.5px"
            >
              Forex
            </Heading>
            <Text mb="4">...</Text>
            <Heading
              size="xs"
              mb="3"
              textTransform="uppercase"
              fontWeight="300"
              letterSpacing="1.5px"
            >
              Commodities
            </Heading>
            <Text mb="4">...</Text>
            <Heading
              size="xs"
              mb="3"
              textTransform="uppercase"
              fontWeight="300"
              letterSpacing="1.5px"
            >
              Custom
            </Heading>
            <Flex mb="6">
              <Input placeholder="0x00000000000000000000000000000000" />
              <Button colorScheme="blue" ml="4">
                Add Synth
              </Button>
            </Flex>

            <Heading size="sm" mb="1">
              Totals
            </Heading>

            <Flex>
              <Text fontSize="xs">
                Minimum C-Ratio:<strong>200%</strong>
              </Text>
              <Spacer />
              <Text fontSize="xs">
                Projected Rewards: <strong>20% APY</strong> (SNX)
              </Text>
              <Spacer />
              <Text fontSize="xs">
                Projected Fees: <strong>20% APY</strong> (sUSD)
              </Text>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Button
        w="100%"
        size="lg"
        colorScheme="blue"
        mb="1"
        onClick={() => {
          Router.push("/stakers/example");
        }}
      >
        Stake
      </Button>
      <Text fontSize="xs" mb="3" textAlign="center">
        By staking, you will receive $12,000 sUSD and an snxStake token.
      </Text>
    </Box>
  );
}
