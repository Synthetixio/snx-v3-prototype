/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

export interface ISynthetixProxyInterface extends utils.Interface {
  functions: {
    "delegateCollateral(uint256,uint256,address,uint256,uint256)": FunctionFragment;
    "getPreferredFund()": FunctionFragment;
    "stake(uint256,address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "delegateCollateral" | "getPreferredFund" | "stake"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "delegateCollateral",
    values: [BigNumberish, BigNumberish, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPreferredFund",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "stake",
    values: [BigNumberish, string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "delegateCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPreferredFund",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;

  events: {};
}

export interface ISynthetixProxy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISynthetixProxyInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    delegateCollateral(
      fundId: BigNumberish,
      accountId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      leverage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getPreferredFund(overrides?: CallOverrides): Promise<[BigNumber]>;

    stake(
      accountId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  delegateCollateral(
    fundId: BigNumberish,
    accountId: BigNumberish,
    collateralType: string,
    amount: BigNumberish,
    leverage: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getPreferredFund(overrides?: CallOverrides): Promise<BigNumber>;

  stake(
    accountId: BigNumberish,
    collateralType: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    delegateCollateral(
      fundId: BigNumberish,
      accountId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      leverage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getPreferredFund(overrides?: CallOverrides): Promise<BigNumber>;

    stake(
      accountId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    delegateCollateral(
      fundId: BigNumberish,
      accountId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      leverage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getPreferredFund(overrides?: CallOverrides): Promise<BigNumber>;

    stake(
      accountId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    delegateCollateral(
      fundId: BigNumberish,
      accountId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      leverage: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getPreferredFund(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    stake(
      accountId: BigNumberish,
      collateralType: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
