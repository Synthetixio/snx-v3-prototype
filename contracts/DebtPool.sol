//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "hardhat/console.sol";

contract DebtPool {

    address public synth;
    address public priceFeed;

    mapping(address => uint256) public debtShares;
    uint256 public totalDebtShares;
    mapping(address => uint256) public vsUSD;
    uint256 public totalVsUSD;
    address[] public feeContracts;

    mapping(address => uint256) collateralAmounts;

    function mint(uint256 amountIn) public {
        // Receive sUSD
        IERC20(sUSD).transferFrom(msg.sender, address(this), amountIn);

        uint256 amountOut = amount;

        // Apply supply target premium
        if(amountOut + synth.totalSupply() > supplyTarget){
            uint feeAmount = amountOut + synth.totalSupply() - supplyTarget) * someValue; // someValue should probably scale quadratically or something
            amountOut -= feeAmount;
        }

        // Apply fees
        for (uint i=0; i<feeContracts.length; i++) {
            uint feeAmount = IFeeContract(feeContracts[i]).quote();
            // figure out this interface and how it gets applied, also do we allow fees to go elsewhere? Volume source fee e.g, ?
            amountOut -= feeAmount;
        }

        // Apply exchange rate
        uint256 exchangeRate = IPriceFeed(priceFeed).exchangeRate(); // Should the pricefeed interface care about trade size or assymetric liquidity? Or is this up to a simulated liquidity fee contract? Even if we wanted this, we could really get it from anyway. Uniswap TWAP doesn't provide it, chainlink certainly doesn't
        amountOut = amountOut * exchangeRate;

        // Mint synths
        IERC20(synth).mint(msg.sender, amountOut);

        // By leaving (amountIn - amountOut) in the pool, we've effectively reduced everyone's debt by the fee amount. By minting less, there's less net debt inflation.

        // Needs a function to provide a "quote" of what would come of the other side without doing the transfer
    }

    function increaseStake(uint fundId, address collateralType, uint collateralAmountChange) {
        uint netDebtInflation = synth.totalSupply() * synth.price() - sUSD.balanceOf(address(this));
        uint totalDebt = totalVsUSD + netDebtInflation;
        int collateralValueChange = collateralAmountChange * synth.price(); 
        debtShares[fundId] += collateralValueChange * totalDebtShares / totalDebt;
        totalDebtShares += collateralValueChange * totalDebtShares / totalDebt;
    }

    function decreaseStake(uint fundId, address collateralType, uint collateralAmountChange) {
        uint netDebtInflation = synth.totalSupply() * synth.price() - sUSD.balanceOf(address(this));
        uint totalDebt = totalVsUSD + netDebtInflation;
        int collateralValueChange = collateralAmountChange * synth.price(); 
        debtShares[fundId] -= collateralValueChange * totalDebtShares / totalDebt;
        totalDebtShares -= collateralValueChange * totalDebtShares / totalDebt;
    }

    // This is "The amount minted (vsusd) delegated to this fund has increased, so we need to track this."
    // This needs to be called on mint in collateral manager and on fund join
    function increaseAmountMinted(fundId, vsUsdAmount){
        vsUSD[fundId] = vsUsdAmount;
        totalVsUSD += vsUsdAmount;
    }

    // This is "The amount minted (vsusd) delegated to this fund has decreased, so we need to track this."
    // This needs to be called on burn in collateral manager and on leave join
    function decreaseAmountMinted(fundId, vsUsdAmount){
        vsUSD[fundId] = vsUsdAmount;
        totalVsUSD -= vsUsdAmount;

    }

    function supplyTarget() public {
        uint collateralValue = 0;
        for (uint i=0; i<collateralTypes.length; i++) { // This will raise eyebrows, but I think we can anticipate <10 collateral types? How many types of "high quality collateral" are out there anyway?
            address collateralType = collateralTypes[i];
            collateralValue += collateralAmounts[collateralType] / collateralExchangeRates[collateralType];
        }
        return collateralValue / synthExchangeRate;
    }

    function burn(uint256 amount) public {
        // get exchange rate from price feed interface
        // apply fees
        synth.burn(msg.sender, amount);
        // provide (and mint if necessary) appropropriate sUSD
    }

    // Do we move the mint/burn functionality to a seperate exchanger contract? We'll need an exchanger contract (maybe peripheral) for atomic swap functions between synths. Consider fee collection
}
