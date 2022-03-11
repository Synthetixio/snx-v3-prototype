//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract Synth is ERC20 {
    // Do we represent sUSD as a special case in the code here? It has the "bank" instead of a "debt pool"?

    string public iconUri;
    string public category;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(address recipient, uint256 amount) external onlySystem {
        _mint(recipient, amount);
    }

    function burn(address recipient, uint256 amount) external onlySystem {
        _burn(recipient, amount);
    }

    modifier onlySystem {
        // "owning" DebtPool contract can mint/burn
        _;
    }

    // add support for permit
}
