//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// This bank loans you sUSD, accepting SNX as collateral
contract Bank {

    mapping(address => uint256) public amountMinted;
    mapping(address => uint256) public amountDeposited;

    function stake(address accountToken, uint256 snxAmount) external {
        // SnxToken.transferFrom(msg.sender, address(this), snxAmount) Example: 100 SNX
        // amountDeposited[staker] += snxAmount
        // Get exchange rate from price feed contract Example: 1 SNX = $4 USD
        // Get default c-ratio, Example: 400%
        // mint(accountToken, sUSDAmount) <- snxAmount * exchangeRate / (c-ratio/100)
    }
    function mint(address accountToken, uint256 sUsdAmount) external {
        // _mint() // Example: 100
        amountMinted[accountToken] += sUsdAmount;
    }
    function burn(address accountToken, uint256 sUsdAmount) external {
        // _burn()
        // update debt shares
    }
    function unstake(address accountToken, uint256 snxAmount) external {
        // Get exchange rate from price feed contract
        // SnxToken.transferFrom(address(this), msg.sender, snxAmount)
        // burn(accountToken, sUSDAmount)
    }
    function liquidate(address accountToken) external {
        // get c-ratio from account
        // get minimum c-ratio from account
    }
}
