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

    function updateAllocatedCollateral(uint fundId, address collateralType, uint collateralAmount) { // might need to pass in the 'change' to collateralAmount and update here

        collateralAmounts[collateralType] = collateralAmount;
        
        uint256 exposureIncreaseValue = 0; //get market rate of amount, does not include exchange fees
        vsUSD[fundId] += exposureIncreaseValue;
        totalVsusd += exposureIncreaseValue;

        debtInflationShares[fundId] += exposureIncreaseValue;
        // Line above needs to be more like
        // if (debtPool.totalDebtInflationShares == 0) {
        //     debtPool.debtInflationShares[staker] = amount
        // } else {
        //     debtPool.debtInflationShares[staker] = debtPool.debtInflationShares[staker] ? debtPool.debtInflationShares[staker] : 0
        //     debtPool.debtInflationShares[staker] += amount * debtPool.totalDebtInflationShares / debtPool.totalDebtInflationShares
        // }

        totalDebtInflationShares += exposureIncreaseValue; // This needs to be updated to reflect the actual change, once the logic above is corrected.

    }

    function supplyTarget() public {
        /*
        uint256 totalSupplyTargetInDollars = 0;
        // Fix this with caching, on debt position change or amount deposited
        for (uint i=0; i<stakers.length; i++) { // this isn't gonna fly
            // using getDebtPosition below gives us support for delegation
            totalSupplyTargetInDollars += Account.getDebtPosition(stakers[i], address(this)) / 100 * Bank.amountDeposited[stakers[i]]; //  * snxPrice / synthExchangeRate;
        }
        return totalSupplyTargetInDollars * snxPrice / synthExchangeRate; // return supply cap in synth unit
        */
        
        // TAKE TWO:
        // This is going to take the amount of each collateral allocated to this pool. (Cached in a mapping updated by fund/staking position updates), apply market rates and add them, then apply the market rates of the synth.
    
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

    // Do we move the above functionality to a seperate exchanger contract. We'll need an exchanger contract (maybe peripheral) for atomic swap functions between synths. Consider fee collection
}
