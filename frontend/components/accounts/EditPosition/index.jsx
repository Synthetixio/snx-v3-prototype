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
          <Tab>No Staking Position</Tab>
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
                    Follow the staking position of another fund
                  </Text>
                  {delegate == "custom" && (
                    <Box>
                      <Text opacity="0.6" fontSize="sm" mt="1.5" mb="1">
                        Fund ID
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

            <Flex>
              <Heading size="sm">Totals:</Heading>
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
          <TabPanel>
            <Text textAlign="center" mt="9" mb="3">
              This collateral will not take a staking position.
            </Text>
            <Text
              textAlign="center"
              mb="6"
              mx="12"
              fontSize="sm"
              color="gray.500"
            >
              This is typically used to take out a loan of sUSD against your
              collateral. Your C-Ratio is subject to less fluctuation, but you
              receive no fees or rewards.
            </Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
