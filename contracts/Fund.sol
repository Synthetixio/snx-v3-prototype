//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract Fund { // Make this an ERC721 and file all the data under ids?
    // Manages relationship between percentages (or "weights"), collateral amounts, and debtpool logic (vUSD, debtinflationshares, and cached supply cap)

    mapping(address => uint256) public positions; // mapping of debt pool to "percentage exposure"

    // "shares" system for how much staked value is going into the fund? see myShareOfTheFund in Account.

    function setDebtPosition(address debtPoolAddress, uint256 positionValue){
        positions[debtPoolAddress] = positionValue;

        for (uint i=0; i<collateralTypes.length; i++) {
            address collateralType = collateralTypes[i];
            uint collateralAmount = CollateralManager.amounts[collateralType].amountDeposited[fund];
            DebtPool.collateralAmounts[collateralType] = collateralAmount * positions[debtPoolAddress];
            // RE: LINE ABOVE - or this should only apply the change to the total? This should happen in `updateCollateralAmounts` on DebtPool
            // More like:
            DebtPool.updateAllocatedCollateral(fundId, collateralType, collateralAmountChange);
        }
    }
     
    // Called on mint/burn in collateral manager and on delegation changes I think?
    function updateCollateralAllocation(address collateralType){
        for (uint i=0; i<debtPools.length; i++) {
            address debtPool = debtPools[i];
            uint collateralAmount = CollateralManager.amounts[collateralType].amountDeposited[fund];
            DebtPool.collateralAmounts[collateralType] = collateralAmount * positions[debtPoolAddress];
            // RE: LINE ABOVE - or this should only apply the change to the total? This should happen in `updateCollateralAmounts` on DebtPool
            // More like:
            DebtPool.updateAllocatedCollateral(fundId, collateralType, collateralAmountChange);
        }
    }

    function getDebt() public {
        uint totalUserDebtInflation = 0;
        for (uint i=0; i<debtPoolAddreses.length; i++) { // This is a scary loop, at minimum we should be storing a list on the account of debt pools where the user has a non-zero position, accounting for delegation
            IDebtPool debtPool = IDebtPool(debtPoolAddreses[i]);
            IERC20 synth = IERC20(debtPool.synth()); 

            uint256 netDebtInflation = synth.totalSupply() * debtPool.price() - sUSD.balanceOf(address(this));
            uint256 userDebtInflation = (debtPool.debtInflationShares[id] / debtPool.totalDebtInflationShares) * (netDebtInflation + debtPool.totalVsusd) - debtPool.vsUSD[id];
            totalUserDebtInflation += userDebtInflation;
        }

        return Bank.amountMinted[stakerToken] + totalUserDebtInflation;
    }
}