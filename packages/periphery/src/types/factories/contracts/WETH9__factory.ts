/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { WETH9, WETH9Interface } from "../../contracts/WETH9";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "guy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "guy",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c0604052600d60808190526c2bb930b83832b21022ba3432b960991b60a090815261002e916000919061007a565b50604080518082019091526004808252630ae8aa8960e31b602090920191825261005a9160019161007a565b506002805460ff1916601217905534801561007457600080fd5b5061014d565b82805461008690610113565b90600052602060002090601f0160209004810192826100a857600085556100ee565b82601f106100c157805160ff19168380011785556100ee565b828001600101855582156100ee579182015b828111156100ee5782518255916020019190600101906100d3565b506100fa9291506100fe565b5090565b5b808211156100fa57600081556001016100ff565b600181811c9082168061012757607f821691505b60208210810361014757634e487b7160e01b600052602260045260246000fd5b50919050565b6107b08061015c6000396000f3fe6080604052600436106100bc5760003560e01c8063313ce56711610074578063a9059cbb1161004e578063a9059cbb146101ec578063d0e30db0146100bc578063dd62ed3e1461020c576100bc565b8063313ce5671461017e57806370a08231146101aa57806395d89b41146101d7576100bc565b806318160ddd116100a557806318160ddd1461012157806323b872dd1461013e5780632e1a7d4d1461015e576100bc565b806306fdde03146100c6578063095ea7b3146100f1575b6100c4610244565b005b3480156100d257600080fd5b506100db61029f565b6040516100e891906105e6565b60405180910390f35b3480156100fd57600080fd5b5061011161010c366004610657565b61032d565b60405190151581526020016100e8565b34801561012d57600080fd5b50475b6040519081526020016100e8565b34801561014a57600080fd5b50610111610159366004610681565b610399565b34801561016a57600080fd5b506100c46101793660046106bd565b61051f565b34801561018a57600080fd5b506002546101989060ff1681565b60405160ff90911681526020016100e8565b3480156101b657600080fd5b506101306101c53660046106d6565b60036020526000908152604090205481565b3480156101e357600080fd5b506100db6105c5565b3480156101f857600080fd5b50610111610207366004610657565b6105d2565b34801561021857600080fd5b506101306102273660046106f1565b600460209081526000928352604080842090915290825290205481565b336000908152600360205260408120805434929061026390849061073a565b909155505060405134815233907fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9060200160405180910390a2565b600080546102ac90610752565b80601f01602080910402602001604051908101604052809291908181526020018280546102d890610752565b80156103255780601f106102fa57610100808354040283529160200191610325565b820191906000526020600020905b81548152906001019060200180831161030857829003601f168201915b505050505081565b3360008181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906103889086815260200190565b60405180910390a350600192915050565b6001600160a01b0383166000908152600360205260408120548211156103be57600080fd5b6000196001600160a01b03851633148015906103fd57506001600160a01b03851660009081526004602090815260408083203384529091529020548114155b1561046b576001600160a01b038516600090815260046020908152604080832033845290915290205483111561043257600080fd5b6001600160a01b03851660009081526004602090815260408083203384529091528120805485929061046590849061078c565b90915550505b6001600160a01b0385166000908152600360205260408120805485929061049390849061078c565b90915550506001600160a01b038416600090815260036020526040812080548592906104c090849061073a565b92505081905550836001600160a01b0316856001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8560405161050c91815260200190565b60405180910390a3506001949350505050565b3360009081526003602052604090205481111561053b57600080fd5b336000908152600360205260408120805483929061055a90849061078c565b9091555050604051339082156108fc029083906000818181858888f1935050505015801561058c573d6000803e3d6000fd5b5060405181815233907f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b659060200160405180910390a250565b600180546102ac90610752565b60006105df338484610399565b9392505050565b600060208083528351808285015260005b81811015610613578581018301518582016040015282016105f7565b81811115610625576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461065257600080fd5b919050565b6000806040838503121561066a57600080fd5b6106738361063b565b946020939093013593505050565b60008060006060848603121561069657600080fd5b61069f8461063b565b92506106ad6020850161063b565b9150604084013590509250925092565b6000602082840312156106cf57600080fd5b5035919050565b6000602082840312156106e857600080fd5b6105df8261063b565b6000806040838503121561070457600080fd5b61070d8361063b565b915061071b6020840161063b565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b6000821982111561074d5761074d610724565b500190565b600181811c9082168061076657607f821691505b60208210810361078657634e487b7160e01b600052602260045260246000fd5b50919050565b60008282101561079e5761079e610724565b50039056fea164736f6c634300080d000a";

type WETH9ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WETH9ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WETH9__factory extends ContractFactory {
  constructor(...args: WETH9ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<WETH9> {
    return super.deploy(overrides || {}) as Promise<WETH9>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): WETH9 {
    return super.attach(address) as WETH9;
  }
  override connect(signer: Signer): WETH9__factory {
    return super.connect(signer) as WETH9__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WETH9Interface {
    return new utils.Interface(_abi) as WETH9Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): WETH9 {
    return new Contract(address, _abi, signerOrProvider) as WETH9;
  }
}
