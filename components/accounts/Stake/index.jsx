import {
  Box,
  Text,
  Tooltip,
  Flex,
  Input,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { SettingsIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { useState } from "react";
import EditPosition from "../EditPosition/index";
import Router from "next/router";
import CollateralTypeSelector from "./CollateralTypeSelector";
import Balance from "./Balance";
import { useRecoilState } from "recoil";
import { collateralTypesState } from "../../../state/index";
import { useMulticall } from "../../../utils/index";

export default function Stake({ createAccount }) {
  // on loading dropdown and token amount https://chakra-ui.com/docs/components/feedback/skeleton ?
  const toast = useToast();
  const {
    isOpen: isOpenFund,
    onOpen: onOpenFund,
    onClose: onCloseFund,
  } = useDisclosure();
  const [collateralTypes] = useRecoilState(collateralTypesState);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [inputAmount, setInputAmount] = useState(""); // accounts for decimals
  const [collateralType, setCollateralType] = useState({});

  const updateAmount = (val) => {
    setAmount(val);
    setInputAmount(val || ""); // divide by decimals and convert to float, use '' if 0
  };

  const updateInputAmount = (val) => {
    setInputAmount(val || ""); // use '' if 0
    setAmount(val); // multiple by decimals and convert to BN
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Can we have global error handling, toasts for reversions, etc.?
    if (createAccount) {
      /*
      const accountId = await getAvailableAccountId();
      const { data, isError, isLoading, write } = useMulticall([
        [], // Mint account token
        [], // Stake specified collateral (collateralType.address) -> convert to wETH if necessary
        [], // Join the Spartan Council fund // spartan council fund id is retrieved from the configurable value on-chain
      ]);
      write();
      */
      toast({
        title: "Approve the transaction to create your account",
        description: "You’ll be redirected once your transaction is processed.",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
      // Wait on an 'account token created' event, then redirect below
      Router.push("/accounts/id");
    } else {
      // toast
      setLoading(false);
    }
  };

  return (
    <>
      <Box bg="gray.900" mb="8" p="6" pb="4" borderRadius="12px">
        <form onSubmit={onSubmit}>
          <Flex mb="3">
            <Input
              type="number"
              size="lg"
              border="none"
              placeholder="0.0"
              mr="4"
              value={inputAmount}
              onChange={(e) => {
                updateInputAmount(e.target.value);
              }}
            />
            <CollateralTypeSelector
              handleChange={(selectedCollateralType) => {
                setCollateralType(selectedCollateralType);
                updateAmount(0);
              }}
            />
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
              isDisabled={!amount}
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
          <Box mr="auto">
            <Balance
              tokenAddress={collateralType.address}
              onUseMax={(maxAmount) => updateAmount(maxAmount)}
            />
          </Box>
          {createAccount && (
            <Text fontSize="xs" textAlign="right">
              Receive an snxAccount token{" "}
              <Tooltip
                textAlign="center"
                label="You will be minted an NFT that represents your account. You can easily transfer it between wallets."
              >
                <InfoOutlineIcon transform="translateY(-1.5px)" />
              </Tooltip>
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
