import { chainIdState, collateralTypesState } from '../../../state';
import {
  CollateralType,
  fundsData,
  getChainById,
} from '../../../utils/constants';
import { useContract } from '../../../utils/hooks/useContract';
import {
  useDeploymentRead,
  useSynthetixRead,
} from '../../../utils/hooks/useDeploymentRead';
import { useMulticall, MulticallCall } from '../../../utils/hooks/useMulticall';
import EditPosition from '../EditPosition';
import Balance from './Balance';
import CollateralTypeSelector from './CollateralTypeSelector';
import {
  LockIcon,
  InfoOutlineIcon,
  EditIcon,
  ExternalLinkIcon,
} from '@chakra-ui/icons';
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
  ToastId,
} from '@chakra-ui/react';
import { ethers, CallOverrides } from 'ethers';
import { BigNumber } from 'ethers';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import {
  useAccount,
  useContractRead,
  erc20ABI,
  useBalance,
  useNetwork,
} from 'wagmi';

type FormType = {
  collateralType: CollateralType;
  amount: BigNumber;
  fundId: string;
};

export default function Stake({ createAccount }: { createAccount: boolean }) {
  const { activeChain } = useNetwork();
  const hasWalletConnected = Boolean(activeChain);
  const [collateralTypes] = useRecoilState(collateralTypesState);
  // on loading dropdown and token amount maybe use https://chakra-ui.com/docs/components/feedback/skeleton
  const toast = useToast();
  const methods = useForm<FormType>({
    mode: 'onChange',
    defaultValues: {
      collateralType: collateralTypes[0],
    },
  });
  const { handleSubmit, register, formState, setValue, control } = methods;

  const collateralContract = useContract('snx.token');
  const snxProxy = useContract('synthetix.Proxy');
  const accountToken = useContract('synthetix.Account.init_account_Proxy.0');
  const {
    isOpen: isOpenFund,
    onOpen: onOpenFund,
    onClose: onCloseFund,
  } = useDisclosure();

  const router = useRouter();

  const [localChainId] = useRecoilState(chainIdState);
  const chain = getChainById(localChainId);
  const selectedCollateralType = useWatch({
    control,
    name: 'collateralType',
  });
  const selectedFundId = useWatch({
    control,
    name: 'fundId',
  });
  const amount = useWatch({
    control,
    name: 'amount',
  });

  const isNativeCurrency =
    selectedCollateralType.symbol === chain?.nativeCurrency?.symbol;

  const { data: accountData } = useAccount();
  const accountAddress = accountData?.address;
  const { data: balanceData } = useBalance({
    addressOrName: accountAddress,
    token: isNativeCurrency ? undefined : selectedCollateralType.address,
    enabled: hasWalletConnected,
  });

  const { data: allowance } = useContractRead(
    {
      addressOrName: selectedCollateralType?.address,
      contractInterface: erc20ABI,
    },
    'allowance',
    {
      args: [accountAddress, snxProxy?.address],
      enabled: !isNativeCurrency && hasWalletConnected,
    }
  );

  const sufficientAllowance = useMemo(() => {
    if (allowance) {
      return allowance?.gte(amount || 0);
    }
  }, [allowance, amount]);

  const generateAccountId = () => {
    return Math.floor(Math.random() * 10000000000);
  }; // ten digit numberf
  const [newAccountId, setNewAccountId] = useState(generateAccountId());
  // useDeploymentRead('accountToken', 'ownerOf', {
  //   args: newAccountId,
  //   onSuccess() {
  //     // newAccountId isn't available
  //     setNewAccountId(generateAccountId());
  //   },
  //   onError(error) {
  //     // newAccountId is available, so we should proceed.
  //   },
  // });

  const { data: fundId } = useSynthetixRead('getPreferredFund', {});

  const calls: MulticallCall[][] = [
    [
      [snxProxy!.contract, 'createAccount', [newAccountId]],
      [
        snxProxy!.contract,
        'stake',
        [
          newAccountId,
          selectedCollateralType.address,
          amount || BigNumber.from(0),
        ],
      ],
      [
        snxProxy!.contract,
        'delegateCollateral',
        [
          fundId || 0,
          newAccountId,
          selectedCollateralType.address,
          amount || BigNumber.from(0),
          ethers.constants.One,
        ],
      ],
    ],
  ];

  const overrides: CallOverrides = {};

  // add extra step to convert to wrapped token if native (ex. ETH)
  // if (isNativeCurrency) {
  //   calls[0].unshift([
  //     collateralContract!.contract,
  //     'deposit',
  //     [],
  //     { value: amount || 0 },
  //   ]);
  //   overrides.value = amount!;
  // }
  // add extra step to "approve" the token if needed before running the multicall
  if (!sufficientAllowance) {
    // TODO: could use permit here as well, in which case its an unshift
    calls.unshift([
      [
        collateralContract!.contract,
        'approve',
        [snxProxy?.address, amount || BigNumber.from(0)],
      ],
    ]);
  }

  const multiTxn = useMulticall(
    calls,
    { overrides },
    {
      onSuccess: () => {
        // TODO: route to accounts page
        toast.closeAll();

        router.push({
          pathname: `/accounts/${newAccountId}`,
          query: router.query,
        });
      },
      onError: e => {
        toast({
          title: 'Could not complete account creation',
          description: 'Please try again.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );

  useEffect(() => {
    if (multiTxn.status === 'pending') {
      // const buildToastDescription = (text: string) => {
      //   // TODO: fix this; txHash not showing up :(
      //   const txHash = multiTxn.currentTxn.data?.hash;
      //   return (
      //     <>
      //       <Text fontSize="sm">{text}</Text>
      //       {chain?.blockExplorers?.etherscan ? (
      //         <Link
      //           href={`${chain?.blockExplorers?.etherscan.url}/${txHash}`}
      //           isExternal
      //         >
      //           Check tx on etherscan <ExternalLinkIcon mx="2px" />
      //         </Link>
      //       ) : (
      //         <Text fontSize="xs">{txHash}</Text>
      //       )}
      //     </>
      //   );
      // };

      if (!sufficientAllowance && multiTxn.step === 0) {
        toast({
          title: `(${multiTxn.step + 1} / ${
            calls.length
          }) Approve collateral for transfer`,
          description:
            'The next transaction will finish staking your collateral',
          status: 'info',
          isClosable: true,
          duration: 9000,
        });
      } else {
        toast({
          title: `(${multiTxn.step + 1} / ${calls.length}) Create your account`,
          description:
            "You'll be redirected once your transaction is processed.",
          status: 'info',
          isClosable: true,
          duration: 9000,
        });
      }
    }
  }, [
    calls.length,
    multiTxn.status,
    multiTxn.step,
    sufficientAllowance,
    toast,
  ]);

  return (
    <>
      <FormProvider {...methods}>
        <Box bg="gray.900" mb="8" p="6" pb="4" borderRadius="12px">
          <form
            onSubmit={handleSubmit(data => {
              multiTxn.exec();
            })}
          >
            <Flex mb="3">
              <Input
                flex="1"
                type="number"
                size="lg"
                border="none"
                placeholder="0.0"
                mr="4"
                id="amount"
                {...register('amount', {
                  validate: {
                    sufficientFunds: v => {
                      return balanceData && balanceData.value.gt(v);
                    },
                    nonZero: v => v.gt(0),
                  },
                  setValueAs: v =>
                    ethers.utils.parseUnits(
                      v || '0',
                      selectedCollateralType.decimals
                    ),
                })}
              />
              <CollateralTypeSelector collateralTypes={collateralTypes} />
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
                isLoading={multiTxn.status === 'pending'}
                isDisabled={!formState.isValid}
                size="lg"
                colorScheme="blue"
                ml="4"
                px="8"
                type="submit"
              >
                {/* @ts-ignore */}
                {formState.errors.amount?.type === 'sufficientFunds'
                  ? 'Insufficient Funds'
                  : 'Stake'}
              </Button>
            </Flex>
          </form>

          <Flex alignItems="center">
            {hasWalletConnected && (
              <Box mr="auto">
                <Balance
                  balance={balanceData?.value || ethers.BigNumber.from(0)}
                  collateralType={selectedCollateralType}
                  onUseMax={(maxAmount: ethers.BigNumber) => {
                    setValue('amount', maxAmount);
                  }}
                />
              </Box>
            )}

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
                Fund:{' '}
                {selectedFundId
                  ? fundsData[selectedFundId]
                    ? fundsData[selectedFundId].name
                    : 'Unknown Fund'
                  : 'None'}{' '}
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
              <EditPosition onClose={onCloseFund} />
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
            </ModalBody>
          </ModalContent>
        </Modal>
      </FormProvider>
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
