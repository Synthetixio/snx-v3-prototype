import {
  Box,
  Heading,
  Tooltip,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Link,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  CheckboxGroup,
  Checkbox,
  Tag,
} from "@chakra-ui/react";
import { EditIcon, AddIcon } from "@chakra-ui/icons";

export default function Permissions() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex mb="2">
        <Heading size="md" mb="1">
          Permissions
        </Heading>
        <Button size="xs" colorScheme="green" ml="auto" onClick={onOpen}>
          <AddIcon mr="1.5" />
          Add Address
        </Button>

        <Modal size="lg" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="black" color="white">
            <ModalHeader>Modify Permissions</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={5}>
                <FormLabel htmlFor="address">Address</FormLabel>
                <Input id="address" />
              </FormControl>

              <Heading size="sm" mb="2">
                Permit Actions
              </Heading>
              <CheckboxGroup>
                <Grid gap={3} templateColumns="repeat(3, 1fr)">
                  <GridItem>
                    <Checkbox value="a" mb="1">
                      Stake
                    </Checkbox>
                    <br />
                    <Checkbox value="b" mb="1">
                      Burn
                    </Checkbox>
                    <br />
                  </GridItem>

                  <GridItem>
                    <Checkbox value="c" mb="1">
                      Unstake
                    </Checkbox>
                    <br />
                    <Checkbox value="d" mb="1">
                      Mint
                    </Checkbox>
                    <br />
                  </GridItem>

                  <GridItem>
                    <Checkbox value="e" mb="1">
                      Claim Rewards
                    </Checkbox>
                    <br />
                    <Checkbox value="f" mb="1">
                      Manage Locks
                    </Checkbox>
                    <br />
                  </GridItem>
                </Grid>

                <Grid gap={3} templateColumns="repeat(2, 1fr)">
                  <GridItem>
                    <Checkbox value="e" mb="1">
                      Manage Staking Position
                    </Checkbox>
                    <br />
                  </GridItem>
                  <GridItem>
                    <Checkbox value="x">Modify Permissions</Checkbox>
                    <br />
                  </GridItem>
                </Grid>
              </CheckboxGroup>

              <Button mt="6" mb="4" isFullWidth colorScheme="blue">
                Update Permissions
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
      <Table size="sm" variant="simple" mb="8">
        <Thead>
          <Tr>
            <Th color="white" pb="2">
              Address
            </Th>
            <Th color="white" pb="2">
              Permissions
            </Th>
            <Th color="white" pb="2"></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td py="4">
              0x0000....0000
              <Link d="inline-block" opacity="0.66" ml="2">
                <Tooltip label="View Account on Tenderly">
                  <img width="10" height="10" src="/tenderly.svg" />
                </Tooltip>
              </Link>
              <Link d="inline-block" opacity="0.66" ml="2">
                <Tooltip label="View Account on Etherscan">
                  <img width="10" height="10" src="/etherscan.svg" />
                </Tooltip>
              </Link>
            </Td>
            <Td>
              <Tag colorScheme="purple" size="sm" mr="1">
                Owner
              </Tag>
            </Td>
            <Td>
              <EditIcon color="blue.400" onClick={onOpen} />
            </Td>
          </Tr>
          <Tr>
            <Td py="4">
              0x0000....0000
              <Link d="inline-block" opacity="0.66" ml="2">
                <Tooltip label="View Account on Tenderly">
                  <img width="10" height="10" src="/tenderly.svg" />
                </Tooltip>
              </Link>
              <Link d="inline-block" opacity="0.66" ml="2">
                <Tooltip label="View Account on Etherscan">
                  <img width="10" height="10" src="/etherscan.svg" />
                </Tooltip>
              </Link>
            </Td>
            <Td>
              <Tag colorScheme="green" size="sm" mr="1">
                Stake
              </Tag>
              <Tag colorScheme="green" size="sm" mr="1">
                Burn
              </Tag>
              <Tag colorScheme="blue" size="sm" mr="1">
                Claim Rewards
              </Tag>
            </Td>
            <Td>
              <EditIcon color="blue.400" onClick={onOpen} />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}