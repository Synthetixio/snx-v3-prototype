import { chainIdState, collateralTypesState } from '../../../state';
import { CollateralType, getChainById, localCollateralTypes } from '../../../utils/constants';
import { tryToBN } from '../../../utils/convert';
import { useContract } from '../../../utils/hooks/useContract';
import { useMulticall, MulticallCall } from '../../../utils/hooks/useMulticall';
import EditPosition from '../EditPosition/index';
import Balance from './Balance';
import CollateralTypeSelector from './CollateralTypeSelector';
import { LockIcon, InfoOutlineIcon, EditIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';
import { ethers, CallOverrides } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { useAccount, useContractRead, erc20ABI, useBalance } from 'wagmi';
import { InitContext } from '../../Init';

export default function Stake({ createAccount }: { createAccount: boolean }) {
  // on loading dropdown and token amount maybe use https://chakra-ui.com/docs/components/feedback/skeleton
  const toast = useToast();
  const [inputAmount, setInputAmount] = useState('0'); // accounts for decimals

  const { collateralTypes, localChainId } = useContext(InitContext);
  const [collateralType, setCollateralType] = useState<CollateralType>(
    collateralTypes[0] || localCollateralTypes[0]
  );

  let amount = tryToBN(inputAmount, collateralType.decimals);

  const collateralContract = useContract('lusd.token');
  const snxProxy = useContract('synthetix.Proxy');
  const onboarding = useContract('Onboarding');
  const {
    isOpen: isOpenFund,
    onOpen: onOpenFund,
    onClose: onCloseFund,
  } = useDisclosure();

  const isNativeCurrency =
    collateralType.symbol ===
    getChainById(localChainId)?.nativeCurrency?.symbol;

  const { data: accountData } = useAccount();
  const accountAddress = accountData?.address;
  const { data: balanceData } = useBalance({
    addressOrName: accountAddress,
    token: isNativeCurrency ? undefined : collateralType.address,
  });
  let sufficientFunds = balanceData?.value.gte(amount || 0);

  const { data: allowance } = useContractRead(
    {
      addressOrName: collateralType?.address,
      contractInterface: erc20ABI,
    },
    'allowance',
    {
      args: [accountAddress, onboarding?.address],
      enabled: !isNativeCurrency,
    }
  );
  let sufficientAllowance = allowance?.gte(amount || 0);

  const calls: MulticallCall[][] = onboarding ? [
    [[onboarding.contract, 'onboard', [collateralContract?.address, amount]]],
  ] : [];

  const overrides: CallOverrides = {};

  // add extra step to convert to wrapped token if native (ex. ETH)
  if (isNativeCurrency && collateralContract) {
    calls[0].unshift([
      collateralContract.contract,
      'deposit',
      [],
      { value: amount || 0 },
    ]);
    overrides.value = amount!;
  }
  // add extra step to "approve" the token if needed before running the multicall
  else if (!sufficientAllowance && collateralContract) {
    // TODO: could use permit here as well, in which case its an unshift
    calls.unshift([
      [
        collateralContract.contract,
        'approve',
        [snxProxy?.address, ethers.constants.MaxUint256],
      ],
    ]);
  }

  const multiTxn = useMulticall(calls, { overrides });

  useEffect(() => {
    if (multiTxn.started) {
      if (!sufficientAllowance && multiTxn.step === 0) {
        toast({
          title: `(${multiTxn.step + 1} / ${
            calls.length
          }) Approve collateral for transfer`,
          description:
            'The next transaction will finish staking your collateral.',
          status: 'info',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: `(${multiTxn.step + 1} / ${calls.length}) Create your account`,
          description:
            'You’ll be redirected once your transaction is processed.',
          status: 'info',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  }, [
    multiTxn.step,
    multiTxn.started,
    calls.length,
    sufficientAllowance,
    toast,
  ]);

  useEffect(() => {
    console.log('collateral type callback hit', collateralTypes.length);
    if (collateralTypes.length) {
      console.log('setting collateral type', collateralTypes[0].symbol);
      setCollateralType(collateralTypes[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collateralTypes.length]);

  return (
    <>
      <Box bg="gray.900" mb="8" p="6" pb="4" borderRadius="12px">
        <form
          onSubmit={e => {
            e.preventDefault();
            multiTxn.exec();
          }}
        >
          <Flex mb="3">
            <Input
              flex="1"
              type="number"
              size="lg"
              border="none"
              placeholder="0.0"
              mr="4"
              value={inputAmount}
              onChange={e => {
                setInputAmount(e.target.value);
              }}
            />
            <CollateralTypeSelector
              handleChange={(selectedCollateralType: CollateralType) => {
                if (selectedCollateralType)
                  setCollateralType(selectedCollateralType);
                // refetch();
              }}
            />
            {false && (
              <Tooltip label="Configure Lock Duration">
                <IconButton
                  onClick={() => {}}
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
              isDisabled={!amount || amount.eq(0) || !sufficientFunds}
              size="lg"
              colorScheme="blue"
              ml="4"
              px="8"
              type="submit"
            >
              {sufficientFunds ? 'Stake' : 'Insufficient Funds'}
            </Button>
          </Flex>
        </form>
        <Flex alignItems="center">
          <Box mr="auto">
            <Balance
              balance={balanceData?.value || ethers.BigNumber.from(0)}
              collateralType={collateralType}
              onUseMax={(maxAmount: ethers.BigNumber) => {
                const amount = ethers.utils.formatUnits(
                  maxAmount,
                  collateralType.decimals
                );

                setInputAmount(amount);
              }}
            />
          </Box>
          {createAccount ? (
            <Text fontSize="xs" textAlign="right">
              Receive an snxAccount token{' '}
              <Tooltip
                textAlign="center"
                label="You will be minted an NFT that represents your account. You can easily transfer it between wallets."
              >
                <InfoOutlineIcon transform="translateY(-1.5px)" />
              </Tooltip>
            </Text>
          ) : (
            <Text fontSize="xs" textAlign="right">
              Fund: None{' '}
              <Link color="blue.400">
                <EditIcon
                  onClick={onOpenFund}
                  style={{ transform: 'translateY(-2px)' }}
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
