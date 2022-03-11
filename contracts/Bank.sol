//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// This bank loans you sUSD, accepting SNX as collateral
contract Bank {

    mapping(address => uint256) public amountMinted;
    mapping(address => uint256) public amountDeposited;

    function stake(address accountToken, uint256 snxAmount) external {
        IERC20(snxTokenAddress).transferFrom(msg.sender, address(this), snxAmount); // Example: 100 SNX
        amountDeposited[accountToken] += snxAmount;
        uint256 snxExchangeRate = 4; // Example: 1 SNX = $4 USD
        uint256 defaultCollateralizationRatio = 400; // Example: 400%, to be read from a SCCP contract
        uint256 sUsdAmount = snxAmount * snxExchangeRate / (defaultCollateralizationRatio/100);
        mint(accountToken, sUSDAmount);
    }
    function mint(address accountToken, uint256 sUsdAmount) public {
        // Do we allow users to put themselves below the min c-ratio? I lean towards yes, and leave it to the UX to warn. Maybe have some functions to "preview" c-ratio effects? This could be done on the FE, but might want in the contract for composability? Still feels peripheral...
        _mint(sUsdAmount); // Example: 100
        amountMinted[accountToken] += sUsdAmount;
    }
    function burn(address accountToken, uint256 sUsdAmount) public {
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
