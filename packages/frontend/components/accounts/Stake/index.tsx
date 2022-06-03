import ethers from 'ethers';
import EditPosition from "../EditPosition/index";
import Balance from "./Balance";
import CollateralTypeSelector from "./CollateralTypeSelector";
import { LockIcon, InfoOutlineIcon, EditIcon } from "@chakra-ui/icons";
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
  Link,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { useState } from "react";
import { useAccount, useContractRead, erc20ABI } from "wagmi";
import { useMulticall, MulticallCall } from "../../../utils/hooks/useMulticall";
import { useContract } from "../../../utils/hooks/useContract";

export default function Stake() {
  // on loading dropdown and token amount maybe use https://chakra-ui.com/docs/components/feedback/skeleton
  const toast = useToast();
  const [amount, setAmount] = useState(BigNumber.from(0));
  const [inputAmount, setInputAmount] = useState(""); // accounts for decimals
  //TODO const [collateralType, setCollateralType] = useState();
  const collateralContract = useContract('lusd.token');
  const snxProxy = useContract('synthetix.Proxy');
  const onboarding = useContract('Onboarding');
  const {
    isOpen: isOpenFund,
    onOpen: onOpenFund,
    onClose: onCloseFund,
  } = useDisclosure();
  /*
  const {
    isOpen: isOpenLock,
    onOpen: onOpenLock,
    onClose: onCloseLock,
  } = useDisclosure();
  */

  const { data: accountData } = useAccount();
  const accountAddress = accountData?.address;
  const { data: balanceData } = useContractRead(
    {
      addressOrName: collateralContract?.address,
      contractInterface: erc20ABI,
    },
    "balanceOf",
    {
      args: accountAddress,
      chainId: 42,
    }
  );
  let balance = balanceData || BigNumber.from(0);
  let sufficientFunds = balance.gte(amount);

  const { data: allowanceData } = useContractRead(
    {
      addressOrName: collateralContract?.address,
      contractInterface: erc20ABI,
    },
    "allowance",
    {
      args: [accountAddress, snxProxy?.address],
      chainId: 42,
    }
  );
  let allowance = allowanceData || BigNumber.from(0);
  let sufficientAllowance = allowance.gte(amount);

  /*const updateAmount = (val) => {
    setAmount(val);
    setInputAmount(
      collateralType?.decimals && val
        ? BigNumber.from(val).div(BigNumber.from(collateralType.decimals))
        : ""
    );
  };

  const updateInputAmount = (val) => {
    setInputAmount(val || ""); // use '' if 0
    setAmount(
      val && collateralType.decimals
        ? BigNumber.from(val).mul(
            BigNumber.from(10).pow(collateralType.decimals)
          )
        : 0
    );
  };*/

  const calls: MulticallCall[][] = [
    [
      [onboarding!.contract, "onboard", [collateralContract?.address, amount.toString()]]
    ]
  ];

  if (!sufficientAllowance) {
    // TODO: could use permit here as well, in which case its an unshift 
    calls.unshift([
      [collateralContract!.contract, 'approve', [snxProxy?.address, ethers.constants.MaxUint256]]
    ]);
  }

  if (collateralContract?.address === 'WETH') {
    calls[0].unshift([
      [collateralContract!.contract, 'deposit', [amount]]
    ])
  }

  const multiTxn = useMulticall(calls)

  /*const onSubmit = async (e) => {
    e.preventDefault();

    const wethAddress = "0x0000"; // call require with current network to get deployment

    // Can we have global error handling, toasts for reversions, etc.?
    if (createAccount) {
      toast({
        title: "Approve the transaction to create your account",
        description: "You’ll be redirected once your transaction is processed.",
        status: "info",
        duration: 9000,
        isClosable: true,
      });

      if (collateralType == wethAddress) {
        // multicall with
        // > wETH.deposit
        // > onboarding.onboard
      } else {
        const { writeAsync } = useDeploymentWrite("Onboarding", "onboard", [
          collateralType.address,
          amount.toString(),
        ]);
        const txResp = await writeAsync();
        const { data } = useWaitForTransaction({
          hash: txResp.hash,
        });
        Router.push({
          pathname: `/accounts/${data.events.accountId}`,
          query: Object.fromEntries(
            new URLSearchParams(window.location.search)
          ),
        });
      }
    } else {
      toast({
        title: "Approve the transaction to stake this collateral",
        description: "Check your wallet application for next steps.",
        status: "info",
        duration: 9000,
        isClosable: true,
      });

      // multicall
      // > if wETH, wrap it
      // > IERC20(collateralType).approve(address(synthetix), amount);
      // > synthetix.stake(lastIdUsed, collateralType, amount);
      // > synthetix.delegateCollateral(fundId, lastIdUsed, collateralType, amount, 1 ether);

      setLoading(false);
    }
  };*/

  return (
    <>
      <Box bg="gray.900" mb="8" p="6" pb="4" borderRadius="12px">
        <form onSubmit={multiTxn.exec}>
          <Flex mb="3">
            <Input
              flex="1"
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
            {false && (
              <Tooltip label="Configure Lock Duration">
                <IconButton
                  onClick={onOpenLock}
                  ml="3"
                  bg="blue.900"
                  color="blue.200"
                  border="1px solid rgba(255,255,255,0.33)"
                  size="lg"
                  aria-label="Configure Staking Position"
                  icon={<LockIcon />}
                />
              </Tooltip>
            )}
            {/*
              <Tooltip label="Configure Lock">
                <IconButton onClick={onOpenLock} ml="3" bg="transparent" border="1px solid rgba(255,255,255,0.33)" size="lg" aria-label='Configure Lock' icon={<LockIcon />} />
              </Tooltip>
            */}
            <Button
              isLoading={multiTxn.started}
              isDisabled={!amount || !sufficientFunds}
              size="lg"
              colorScheme="blue"
              ml="4"
              px="8"
              type="submit"
            >
              {sufficientFunds ? "Stake" : "Insufficient Funds"}
            </Button>
          </Flex>
        </form>
        <Flex alignItems="center">
          <Box mr="auto">
            <Balance
              balance={balance}
              collateralType={collateralType}
              onUseMax={(maxAmount) => updateInputAmount(maxAmount)}
            />
          </Box>
          {createAccount ? (
            <Text fontSize="xs" textAlign="right">
              Receive an snxAccount token{" "}
              <Tooltip
                textAlign="center"
                label="You will be minted an NFT that represents your account. You can easily transfer it between wallets."
              >
                <InfoOutlineIcon transform="translateY(-1.5px)" />
              </Tooltip>
            </Text>
          ) : (
            <Text fontSize="xs" textAlign="right">
              Staking Position: None{" "}
              <Link color="blue.400">
                <EditIcon
                  onClick={onOpenFund}
                  style={{ transform: "translateY(-2px)" }}
                />
              </Link>
            </Text>
          )}
        </Flex>
      </Box>

      <Modal size="2xl" isOpen={isOpenFund} onClose={onCloseFund}>
        <ModalOverlay />
        <ModalContent bg="black" color="white">
          <ModalHeader>Select Fund</ModalHeader>
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
      {/*
      <Modal size="2xl" isOpen={isOpenLock} onClose={onCloseLock}>
        <ModalOverlay />
        <ModalContent bg="black" color="white">
          <ModalHeader>Manage Lock [WIP]</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} alignItems="center">
              <GridItem mb="4">
                Lock your staked SNX tokens to increase your rewards, fees, and
                voting power. Benefits scale the longer you lock.
              </GridItem>
              <GridItem mb="4">
                <Heading mb="1.5" size="sm">
                  Locked SNX
                </Heading>
                <Progress
                  mb="1"
                  value="23"
                  colorScheme="green"
                  size="sm"
                  borderRadius="4"
                />
                <Text fontSize="xs">
                  Total Locked SNX: 2.3MM
                  <br />
                  SNX Floating Supply: 8.2MM
                </Text>
              </GridItem>
            </Grid>

            <Heading mb="2" size="md">
              Lock Collateral
            </Heading>

            <Heading mb="2" size="md">
              Extend Lock
            </Heading>

            <Grid mb="2" templateColumns="repeat(3, 1fr)" gap={4}>
              <GridItem mb="4">
                <FormControl>
                  <FormLabel htmlFor="amount">Amount</FormLabel>
                  <InputGroup size="sm">
                    <Input id="amount" type="amount" />
                    <InputRightAddon color="black">SNX</InputRightAddon>
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem mb="4">
                <FormControl mb="6">
                  <FormLabel htmlFor="name">Lock Duration</FormLabel>
                  <ButtonGroup
                    size="sm"
                    isAttached
                    colorScheme="blue"
                    variant="outline"
                  >
                    <Button mr="-px">1W</Button>
                    <Button mr="-px">1M</Button>
                    <Button mr="-px">3M</Button>
                    <Button mr="-px">6M</Button>
                    <Button mr="-px">1Y</Button>
                    <Button mr="-px">2Y</Button>
                    <IconButton aria-label="Custom" icon={<CalendarIcon />} />
                  </ButtonGroup>
                </FormControl>
              </GridItem>
              <GridItem mb="4">
                <Button size="sm" colorScheme="blue" w="100%" mt="8">
                  Lock
                </Button>
              </GridItem>
            </Grid>

            <Heading mb="2" size="md">
              Unlock
            </Heading>

            <Text>
              You can unlock your collateral early, allowing you to unstake it,
              but will incur a penalty of <strong>50%</strong>. The penalized
              collateral is liquidated.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
      */}
    </>
  );
}
