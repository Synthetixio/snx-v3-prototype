//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract SNX is ERC20 {
    constructor(uint256 initialSupply) ERC20("Synthetix", "SNX") {
        _mint(msg.sender, initialSupply);
    }

    function mint(address recipient, uint256 amount) external onlySystem {
        _mint(recipient, amount);
    }

    modifier onlySystem {
        // Rewards contract can mint
        _;
    }
    
    // add support for permit
}
