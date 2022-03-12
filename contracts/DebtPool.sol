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
    address[] public feeContracts;

    function mint(uint256 amount) public {
        IERC20(sUSD).transferFrom(msg.sender, address(this), amount);
        uint256 exchangeRate = IPriceFeed(priceFeed).exchangeRate(); // Should the pricefeed interface care about trade size or assymetric liquidity? Or is this up to a simulated liquidity fee contract? Even if we wanted this, we could really get it from anyway. Uniswap TWAP doesn't provide it, chainlink certainly doesn't
        uint256 outputAmount = amount * exchangeRate;
        require(outputAmount + synth.totalSupply() < supplyCap); // Or do fancy thing that effects price if it's going over

        for (uint i=0; i<feeContracts.length; i++) {
            IFeeContract(feeContracts[i]); // figure out this interface and how it gets applied 
        }

        IERC20(synth).mint(msg.sender, amount);

        // move the exchange rate calculation inclusive of fees into a seperate function to be able to provide quotes
    }

    function supplyCap() public {
        uint256 totalSupplyCapInDollars = 0;
        // Fix this with caching
        for (uint i=0; i<stakers.length; i++) { // this isn't gonna fly
            // using getDebtPosition below gives us support for delegation
            totalSupplyCapInDollars += Account.getDebtPosition(stakers[i], address(this)) / 100 * Bank.amountDeposited[stakers[i]]; //  * snxPrice / synthExchangeRate;
        }
        return totalSupplyCapInDollars * snxPrice / synthExchangeRate; // return supply cap in synth unit
    }

    function burn(uint256 amount) public {
        // get exchange rate from price feed interface
        // apply fees
        synth.burn(msg.sender, amount);
        // provide (and mint if necessary) appropropriate sUSD
    }

    // Do we move the above functionality to a seperate exchanger contract. We'll need an exchanger contract (maybe peripheral) for atomic swap functions between synths. Consider fee collection
}
