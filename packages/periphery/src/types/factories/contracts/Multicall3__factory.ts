/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  Multicall3,
  Multicall3Interface,
} from "../../contracts/Multicall3";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "aggregate",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "bytes[]",
        name: "returnData",
        type: "bytes[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bool",
            name: "allowFailure",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call3[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "aggregate3",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bool",
            name: "allowFailure",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call3Value[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "aggregate3Value",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "blockAndAggregate",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBasefee",
    outputs: [
      {
        internalType: "uint256",
        name: "basefee",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "getBlockHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBlockNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getChainId",
    outputs: [
      {
        internalType: "uint256",
        name: "chainid",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockCoinbase",
    outputs: [
      {
        internalType: "address",
        name: "coinbase",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockDifficulty",
    outputs: [
      {
        internalType: "uint256",
        name: "difficulty",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockGasLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "gaslimit",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
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
        name: "addr",
        type: "address",
      },
    ],
    name: "getEthBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastBlockHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "requireSuccess",
        type: "bool",
      },
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "tryAggregate",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "requireSuccess",
        type: "bool",
      },
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "tryBlockAndAggregate",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610cc5806100206000396000f3fe6080604052600436106100f35760003560e01c80634d2301cc1161008a578063a8b0574e11610059578063a8b0574e1461022f578063bce38bd71461024a578063c3077fa91461025d578063ee82ac5e1461027057600080fd5b80634d2301cc146101ce57806372425d9d146101f657806382ad56cb1461020957806386d516e81461021c57600080fd5b80633408e470116100c65780633408e47014610173578063399542e9146101865780633e64a696146101a857806342cbb15c146101bb57600080fd5b80630f28c97d146100f8578063174dea711461011a578063252dba421461013a57806327e86d6e1461015b575b600080fd5b34801561010457600080fd5b50425b6040519081526020015b60405180910390f35b61012d6101283660046109a4565b61028f565b6040516101119190610aa1565b61014d6101483660046109a4565b610483565b604051610111929190610abb565b34801561016757600080fd5b50436000190140610107565b34801561017f57600080fd5b5046610107565b610199610194366004610b25565b6105fd565b60405161011193929190610b7f565b3480156101b457600080fd5b5048610107565b3480156101c757600080fd5b5043610107565b3480156101da57600080fd5b506101076101e9366004610ba7565b6001600160a01b03163190565b34801561020257600080fd5b5044610107565b61012d6102173660046109a4565b610618565b34801561022857600080fd5b5045610107565b34801561023b57600080fd5b50604051418152602001610111565b61012d610258366004610b25565b6107a0565b61019961026b3660046109a4565b610939565b34801561027c57600080fd5b5061010761028b366004610bd0565b4090565b60606000828067ffffffffffffffff8111156102ad576102ad610be9565b6040519080825280602002602001820160405280156102f357816020015b6040805180820190915260008152606060208201528152602001906001900390816102cb5790505b5092503660005b8281101561042557600085828151811061031657610316610bff565b6020026020010151905087878381811061033257610332610bff565b90506020028101906103449190610c15565b60408101359586019590935061035d6020850185610ba7565b6001600160a01b0316816103746060870187610c35565b604051610382929190610c7c565b60006040518083038185875af1925050503d80600081146103bf576040519150601f19603f3d011682016040523d82523d6000602084013e6103c4565b606091505b50602080850191909152901515808452908501351761041b5762461bcd60e51b600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260846000fd5b50506001016102fa565b5082341461047a5760405162461bcd60e51b815260206004820152601a60248201527f4d756c746963616c6c333a2076616c7565206d69736d6174636800000000000060448201526064015b60405180910390fd5b50505092915050565b436060828067ffffffffffffffff8111156104a0576104a0610be9565b6040519080825280602002602001820160405280156104d357816020015b60608152602001906001900390816104be5790505b5091503660005b828110156105f35760008787838181106104f6576104f6610bff565b90506020028101906105089190610c8c565b92506105176020840184610ba7565b6001600160a01b031661052d6020850185610c35565b60405161053b929190610c7c565b6000604051808303816000865af19150503d8060008114610578576040519150601f19603f3d011682016040523d82523d6000602084013e61057d565b606091505b5086848151811061059057610590610bff565b60209081029190910101529050806105ea5760405162461bcd60e51b815260206004820152601760248201527f4d756c746963616c6c333a2063616c6c206661696c65640000000000000000006044820152606401610471565b506001016104da565b5050509250929050565b438040606061060d8686866107a0565b905093509350939050565b6060818067ffffffffffffffff81111561063457610634610be9565b60405190808252806020026020018201604052801561067a57816020015b6040805180820190915260008152606060208201528152602001906001900390816106525790505b5091503660005b8281101561047a57600084828151811061069d5761069d610bff565b602002602001015190508686838181106106b9576106b9610bff565b90506020028101906106cb9190610ca2565b92506106da6020840184610ba7565b6001600160a01b03166106f06040850185610c35565b6040516106fe929190610c7c565b6000604051808303816000865af19150503d806000811461073b576040519150601f19603f3d011682016040523d82523d6000602084013e610740565b606091505b5060208084019190915290151580835290840135176107975762461bcd60e51b600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260646000fd5b50600101610681565b6060818067ffffffffffffffff8111156107bc576107bc610be9565b60405190808252806020026020018201604052801561080257816020015b6040805180820190915260008152606060208201528152602001906001900390816107da5790505b5091503660005b8281101561092f57600084828151811061082557610825610bff565b6020026020010151905086868381811061084157610841610bff565b90506020028101906108539190610c8c565b92506108626020840184610ba7565b6001600160a01b03166108786020850185610c35565b604051610886929190610c7c565b6000604051808303816000865af19150503d80600081146108c3576040519150601f19603f3d011682016040523d82523d6000602084013e6108c8565b606091505b5060208301521515815287156109265780516109265760405162461bcd60e51b815260206004820152601760248201527f4d756c746963616c6c333a2063616c6c206661696c65640000000000000000006044820152606401610471565b50600101610809565b5050509392505050565b600080606061094a600186866105fd565b919790965090945092505050565b60008083601f84011261096a57600080fd5b50813567ffffffffffffffff81111561098257600080fd5b6020830191508360208260051b850101111561099d57600080fd5b9250929050565b600080602083850312156109b757600080fd5b823567ffffffffffffffff8111156109ce57600080fd5b6109da85828601610958565b90969095509350505050565b6000815180845260005b81811015610a0c576020818501810151868301820152016109f0565b81811115610a1e576000602083870101525b50601f01601f19169290920160200192915050565b600082825180855260208086019550808260051b84010181860160005b84811015610a9457858303601f1901895281518051151584528401516040858501819052610a80818601836109e6565b9a86019a9450505090830190600101610a50565b5090979650505050505050565b602081526000610ab46020830184610a33565b9392505050565b600060408201848352602060408185015281855180845260608601915060608160051b870101935082870160005b82811015610b1757605f19888703018452610b058683516109e6565b95509284019290840190600101610ae9565b509398975050505050505050565b600080600060408486031215610b3a57600080fd5b83358015158114610b4a57600080fd5b9250602084013567ffffffffffffffff811115610b6657600080fd5b610b7286828701610958565b9497909650939450505050565b838152826020820152606060408201526000610b9e6060830184610a33565b95945050505050565b600060208284031215610bb957600080fd5b81356001600160a01b0381168114610ab457600080fd5b600060208284031215610be257600080fd5b5035919050565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b60008235607e19833603018112610c2b57600080fd5b9190910192915050565b6000808335601e19843603018112610c4c57600080fd5b83018035915067ffffffffffffffff821115610c6757600080fd5b60200191503681900382131561099d57600080fd5b8183823760009101908152919050565b60008235603e19833603018112610c2b57600080fd5b60008235605e19833603018112610c2b57600080fdfea164736f6c634300080d000a";

type Multicall3ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Multicall3ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Multicall3__factory extends ContractFactory {
  constructor(...args: Multicall3ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Multicall3> {
    return super.deploy(overrides || {}) as Promise<Multicall3>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Multicall3 {
    return super.attach(address) as Multicall3;
  }
  override connect(signer: Signer): Multicall3__factory {
    return super.connect(signer) as Multicall3__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Multicall3Interface {
    return new utils.Interface(_abi) as Multicall3Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Multicall3 {
    return new Contract(address, _abi, signerOrProvider) as Multicall3;
  }
}
