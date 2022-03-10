//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "hardhat/console.sol";

contract DebtPool {

    address public synth;
    address public priceFeed;

    mapping(address => uint256) public debtInflationShares;
    uint256 public totalDebtInflationShares;
    mapping(address => uint256) public vsUSD;
    uint256 public totalVsUSD;
    
    uint256 public supplyCap;

    function mint(uint256 amount) public {
        IERC20(sUSD).transferFrom(msg.sender, address(this), amount);
        uint256 exchangeRate = IPriceFeed(priceFeed).exchangeRate() // Should the pricefeed interface care about trade size or assymetric liquidity? Or is this up to a simulated liquidity fee contract? Even if we wanted this, we could really get it from anyway. Uniswap TWAP doesn't provide it, chainlink certainly doesn't
        // Check supply cap - limit amount based on supplyCap with revert, or do fancy thing that effects price if it's going over
        // Apply fees
        IERC20(synth).mint(msg.sender, amount);
    }

    function burn(uint256 amount) public {
        // get exchange rate from price feed interface
        // apply fees
        synth.burn(msg.sender, amount);
        // provide (and mint if necessary) appropropriate sUSD
    }

    // Do we move the above functionality to a seperate exchanger contract, and leave these as 'dumb' erc-20s? We'll need an exchanger contract (maybe peripheral) for atomic swap functions between synths and fee collection
}
