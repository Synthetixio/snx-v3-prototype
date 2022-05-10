import {
  Box,
  Text,
  Tooltip,
  Badge,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  SettingsIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import { useState } from "react";
import EditPosition from "../EditPosition/index";
import Router from "next/router";
import { useContractWrite } from "wagmi";

export default function Stake({ createAccount }) {
  const {
    isOpen: isOpenFund,
    onOpen: onOpenFund,
    onClose: onCloseFund,
  } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const { data, isError, isLoading, write } = useContractWrite(
    {
      addressOrName: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
      contractInterface: [],
    },
    "feed"
  );

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);

    write();

    // on loading dropdown and token amount https://chakra-ui.com/docs/components/feedback/skeleton ?
    // set button to loading
    if (createAccount) {
      Router.push("/accounts/id");
    } else {
      // toast
    }
  };

  return (
    <>
      <Box bg="gray.900" mb="8" p="6" pb="4" borderRadius="12px">
        <form onSubmit={onSubmit}>
          <Flex mb="3">
            <Input size="lg" border="none" placeholder="0.0" />
            <Menu>
              <MenuButton
                ml="4"
                border="1px solid rgba(255,255,255,0.33)"
                borderRadius="6px"
                alignItems="center"
                cursor="pointer"
              >
                <Flex>
                  <Box
                    w="24px"
                    h="24px"
                    borderRadius="12px"
                    overflow="hidden"
                    ml="3.5"
                    mr="1"
                  >
                    <img
                      width="24"
                      height="24"
                      src="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png"
                    />
                  </Box>
                  <Text fontWeight="600">SNX</Text>
                  <ChevronDownIcon opacity="0.66" w="5" h="5" ml="4" mr="2" />
                </Flex>
              </MenuButton>
              <MenuList
                px={2}
                bg="black"
                border="1px solid rgba(255,255,255,0.33)"
              >
                <MenuItem
                  alignItems="left"
                  mb={1}
                  flexDirection="column"
                  _hover={{ bg: "gray.800" }}
                  _focus={{ bg: "gray.800" }}
                  _active={{ bg: "gray.800" }}
                >
                  <Flex flexDirection="row">
                    <Box
                      w="24px"
                      h="24px"
                      borderRadius="12px"
                      overflow="hidden"
                      mr="1"
                    >
                      <img
                        width="24"
                        height="24"
                        src="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png"
                      />
                    </Box>
                    <Text fontWeight="600">SNX</Text>
                  </Flex>
                </MenuItem>
                <MenuItem
                  alignItems="left"
                  mb={1}
                  flexDirection="column"
                  _hover={{ bg: "gray.800" }}
                  _focus={{ bg: "gray.800" }}
                  _active={{ bg: "gray.800" }}
                >
                  <Flex flexDirection="row">
                    <Box
                      w="24px"
                      h="24px"
                      borderRadius="12px"
                      overflow="hidden"
                      mr="1"
                    >
                      <img
                        width="24"
                        height="24"
                        src="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x5f98805A4E8be255a32880FDeC7F6728C6568bA0/logo.png"
                      />
                    </Box>
                    <Text fontWeight="600">LUSD</Text>
                  </Flex>
                </MenuItem>
                <MenuItem
                  alignItems="left"
                  flexDirection="column"
                  _hover={{ bg: "gray.800" }}
                  _focus={{ bg: "gray.800" }}
                  _active={{ bg: "gray.800" }}
                >
                  <Flex flexDirection="row">
                    <Box
                      w="24px"
                      h="24px"
                      borderRadius="12px"
                      overflow="hidden"
                      mr="1"
                    >
                      <img
                        width="24"
                        height="24"
                        src="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
                      />
                    </Box>
                    <Text fontWeight="600">ETH</Text>
                  </Flex>
                </MenuItem>
              </MenuList>
            </Menu>
            {!createAccount && (
              <Tooltip label="Configure Staking Position">
                <IconButton
                  onClick={onOpenFund}
                  ml="3"
                  bg="blue.900"
                  color="blue.200"
                  border="1px solid rgba(255,255,255,0.33)"
                  size="lg"
                  aria-label="Configure Staking Position"
                  icon={<SettingsIcon />}
                />
              </Tooltip>
            )}
            {/*
        <Tooltip label="Configure Lock">
          <IconButton onClick={onOpenLock} ml="3" bg="transparent" border="1px solid rgba(255,255,255,0.33)" size="lg" aria-label='Configure Lock' icon={<LockIcon />} />
        </Tooltip>
        */}
            <Button
              isLoading={loading}
              size="lg"
              colorScheme="blue"
              ml="4"
              px="8"
              type="submit"
            >
              Stake
            </Button>
          </Flex>
        </form>
        <Flex alignItems="center">
          <Text fontSize="xs" mr="auto">
            Balance: 2,000
            <Badge
              ml="2"
              variant="outline"
              colorScheme="blue"
              transform="translateY(-1px)"
            >
              Use Max
            </Badge>
          </Text>
          {createAccount && (
            <Text fontSize="xs" textAlign="right">
              Receive an snxAccount token{" "}
              <InfoOutlineIcon transform="translateY(-1.5px)" />
            </Text>
          )}
        </Flex>
      </Box>

      <Modal size="2xl" isOpen={isOpenFund} onClose={onCloseFund}>
        <ModalOverlay />
        <ModalContent bg="black" color="white">
          <ModalHeader>Manage Staking Position</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditPosition />
            {/*
          <Heading size="sm" mb="3">Leverage</Heading>
          <Grid templateColumns='repeat(12, 1fr)' gap={6} alignItems="center" mb="6">
            <GridItem colSpan="3">
              <InputGroup>
                <InputLeftAddon bg="black">&times;</InputLeftAddon>
                <Input id='amount' type='amount' borderLeft="none" value="1" />
              </InputGroup>
            </GridItem>
            <GridItem colSpan="9">
              <Text fontSize="sm">Leveraging your staking position allows you to earn more rewards, but your c-ratio is subject to greater volatiity. <em>Use leverage with caution.</em></Text>
            </GridItem>
          </Grid>
          */}
            <Button w="100%" colorScheme="blue">
              Update
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
