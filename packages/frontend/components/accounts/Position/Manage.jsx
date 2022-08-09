import { InfoOutlineIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  Text,
  Box,
  Link,
  Grid,
  GridItem,
  Tooltip,
  Input,
  Button,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Flex,
  Heading,
  Badge,
} from "@chakra-ui/react";

export default function Manage() {
  return (
    <Box mb="2">
      {/* Thinking we have a mint/burn component and stake/unstake component, and then
      you can click 'presets' to configure how you're interacting with them. */}
      <Box bg="gray.900" mb="12" p="6" borderRadius="12px">
        <Heading size="sm" mb="2">
          Maintain Your C-Ratio
        </Heading>
        {/* timeseries of c-ratio */}
        <Text fontSize="sm" mb="2">
          As a staker, you’re enabling the creation of synthetic assets by
          providing collateral to back them. Your <strong>C-Ratio</strong> is
          the value of your staked collateral divided by the value of synths
          you’re responsible for. It’s important for everyone to keep a high
          C-Ratio, ensuring that the synths stay properly backed even when
          prices are volatile.
        </Text>
        <Text fontSize="sm" mb="4">
          <strong>
            If your C-Ratio drops below your minimum of 250%, you may be
            liquidated and lose your collateral.
          </strong>{" "}
          There are two ways to increase your C-Ratio:
        </Text>

        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <GridItem>
            <Heading size="sm" mb="1">
              Increase Your Stake
            </Heading>
            <Text fontSize="xs" mb="2">
              Provide more collateral to the system.{" "}
              <Tooltip label="Use the form below to have your staking position managed by the Spartan Council. Click 'Manage Collateral' above to customize your staking position and leverage.">
                <InfoOutlineIcon transform="translateY(-1.5px)" />
              </Tooltip>
            </Text>
            <Grid templateColumns="repeat(4, 1fr)" gap={3}>
              <GridItem colSpan={3}>
                <Input size="sm" id="amount" type="amount" />
              </GridItem>
              <GridItem>
                <Button size="sm" colorScheme="blue" w="100%">
                  Stake
                </Button>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem>
            <Heading size="sm" mb="1">
              Burn Synths
            </Heading>
            <Text fontSize="xs" mb="2">
              Reduce the amount of synths in circulation.
            </Text>
            <Grid templateColumns="repeat(4, 1fr)" gap={3}>
              <GridItem colSpan={3}>
                <Input size="sm" id="amount" type="amount" />
              </GridItem>
              <GridItem>
                <Button size="sm" colorScheme="blue" w="100%">
                  Burn
                </Button>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Box>
      <Box bg="gray.900" mb="12" p="6" borderRadius="12px">
        <Heading size="md" mb="3">
          Manage Debt
        </Heading>
        <Box mb="8">
          <Heading fontSize="lg" mb="1">
            You have $0 of debt associated with this collateral.
          </Heading>
          <Text>
            You have $0 of collateral associated with this debt, giving you an
            unlimted C-Ratio. The value of your collateral fluctates with market
            conditions.{" "}
            <em>
              If your C-Ratio drops below 200% you may be liquidated and lose
              your collateral.
            </em>
          </Text>
        </Box>

        <Box mb="8">
          <Heading fontSize="lg" mb="1">
            $0 of this debt has been accrued from the{" "}
            <Text
              borderBottom="1px dotted rgba(255,255,255,0.8)"
              display="inline"
            >
              Spartan Council
            </Text>{" "}
            fund.
          </Heading>
          <Text>
            This will fluctuate depending on the markets where this fund has
            allocated liquidity.
          </Text>
        </Box>

        <Box mb="4">
          <Heading fontSize="lg" mb="4">
            $0 of this debt has been accrued from minting and burning sUSD.
          </Heading>
          <SimpleGrid columns={2} spacing={4}>
            <Box>
              <Heading fontSize="md" mb="1">
                Mint sUSD
              </Heading>
              <Text fontSize="sm" mb="1">
                Increase your debt and harm your C-Ratio.
              </Text>

              <Box bg="gray.900" mb="2" p="6" pb="4" borderRadius="12px">
                <form>
                  <Flex mb="3">
                    <Input
                      flex="1"
                      type="number"
                      border="none"
                      placeholder="0.0"
                      // value={null}
                      onChange={e => {
                        null;
                      }}
                    />
                    <Button
                      // isLoading={null}
                      // isDisabled={null}
                      colorScheme="blue"
                      ml="4"
                      px="8"
                      type="submit"
                    >
                      Mint
                    </Button>
                  </Flex>
                </form>
                <Flex alignItems="center">
                  <Box mr="auto">
                    <Text fontSize="xs">
                      Max Mint: $1,200
                      <Tooltip label="You can't mint sUSD that takes your C-Ratio below the target c-ratio of 300%.">
                        <QuestionOutlineIcon
                          transform="translateY(-1.5px)"
                          ml="1"
                        />
                      </Tooltip>
                    </Text>
                  </Box>
                  <Link>
                    <Badge
                      as="button"
                      ml="3"
                      variant="outline"
                      colorScheme="blue"
                      transform="translateY(-2px)"
                    >
                      Use Max
                    </Badge>
                  </Link>
                </Flex>
              </Box>
              <Text fontSize="sm">
                This is effectively taking out a zero-interest loan against your
                collateral.
              </Text>
            </Box>

            <Box>
              <Heading fontSize="md" mb="1">
                Burn sUSD
              </Heading>
              <Text fontSize="sm" mb="1">
                Reduce your debt and improve your C-Ratio.
              </Text>

              <Box bg="gray.900" mb="2" p="6" pb="4" borderRadius="12px">
                <form>
                  <Flex mb="3">
                    <Input
                      flex="1"
                      type="number"
                      border="none"
                      placeholder="0.0"
                      // value={null}
                      onChange={e => {
                        null;
                      }}
                    />
                    <Button
                      // isLoading={null}
                      // isDisabled={null}
                      colorScheme="blue"
                      ml="4"
                      px="8"
                      type="submit"
                    >
                      Burn
                    </Button>
                  </Flex>
                </form>
                <Flex alignItems="center">
                  <Box mr="auto">
                    <Text fontSize="xs">Balance: $2,000</Text>
                  </Box>
                  <Link>
                    <Badge
                      as="button"
                      ml="3"
                      variant="outline"
                      colorScheme="blue"
                      transform="translateY(-2px)"
                    >
                      Use Max
                    </Badge>
                  </Link>
                </Flex>
              </Box>
              <Text fontSize="sm">
                You can purchase sUSD from most major exchanges like{" "}
                <Link
                  display="inline"
                  _hover={{ textDecoration: "none" }}
                  borderBottom="1px dotted rgba(255,255,255,0.5)"
                >
                  one we like
                </Link>
                .
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}
