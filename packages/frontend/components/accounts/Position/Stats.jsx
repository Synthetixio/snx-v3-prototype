import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Tooltip,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function Stats() {
  return (
    <Box>
      <Grid mb="3" textAlign="center" templateColumns="repeat(4, 1fr)" gap={6}>
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            Staked
          </Text>
          <Heading size="lg">$5,000</Heading>
          <Text fontSize="sm">
            <NextLink href={"/accounts/example/collateral"} passHref>
              <Link fontWeight="normal" color="blue.400">
                Manage Collateral
              </Link>
            </NextLink>
          </Text>
        </GridItem>
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            C-Ratio
          </Text>
          <Heading size="lg">300%</Heading>
          <Text opacity="0.6" fontSize="sm">
            Minimum 250%
          </Text>
        </GridItem>
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            Fees APY
          </Text>
          <Heading size="lg">25%</Heading>
          <Text opacity="0.6" fontSize="sm">
            in sUSD
          </Text>
        </GridItem>
        <GridItem mb="3">
          <Text fontSize="sm" fontWeight="semibold">
            Rewards APY
          </Text>
          <Heading size="lg">75%</Heading>
          <Text opacity="0.6" fontSize="sm">
            in SNX
          </Text>
        </GridItem>
      </Grid>

      <Text fontSize="xl" mb="6">
        You’ve earned a total of <strong>$2,230</strong> in exchange fees.{" "}
        <Tooltip label="Your fees, earned when the synths in your staking position are exchanged, are automatically deducted from your debt. You can retrieve the earned fees by minting sUSD.">
          <InfoOutlineIcon transform="translateY(-2px)" />
        </Tooltip>
      </Text>
    </Box>
  );
}
