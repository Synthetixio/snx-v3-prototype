//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract Synth is ERC20 {

    string public iconUri;
    string public category;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    // mint and burn functions for debtpool (or onlySystem)
    // add support for permit
}
