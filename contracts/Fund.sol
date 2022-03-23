//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

// Is "Fund" the right name for this contract? Maybe "StakingPosition"?
contract Fund { // Make this an ERC721 and file all the data under ids? also look at https://eips.ethereum.org/EIPS/eip-4626 ?
    // Manages relationship between percentages (or "weights"), collateral amounts, and debtpool logic (vUSD, debtinflationshares, and cached supply cap)

    mapping(address => uint256) public positions; // mapping of debt pool to "percentage exposure"
    mapping(uint256 => uint256) public lpShares; // mapping of fund to share of debt responsibility
    uint256 public totalLpShares;
    uint256 public amountMinted;

    // This is "The amount of a given type of collateral that this fund controls has changed, so we need to let all of the debt pools in it's staking position know about this."
    // This needs to be called on mint/burn in collateral manager and on fund join/leave changes
    function updateCollateralAllocation(address collateralType){
        for (uint i=0; i<debtPools.length; i++) {
            address debtPool = debtPools[i];

            uint collateralAmount = CollateralManager.amounts[collateralType].amountDeposited[fund]; // this needs to sort of "join" through the accounts to get to the collateral available
            uint currentCollateralAllocation = IDebtPool(debtPool).collateralAmounts[collateralType];
            uint newCollateralAllocation = collateralAmount * positions[debtPool];

            // Does amount minted change here?

            if(newCollateralAllocation > currentCollateralAllocation){
                IDebtPool(debtPool).increaseStake(fundId, collateralType, newCollateralAllocation - currentCollateralAllocation);
            } else if(newCollateralAllocation < currentCollateralAllocation){
                IDebtPool(debtPool).decreaseStake(fundId, collateralType, currentCollateralAllocation - newCollateralAllocation);
            }
        }
    }

    // This is "The amount minted (vsusd) delegated to this fund has increased, so we need to track this."
    // This needs to be called on mint in collateral manager and on fund join
    function increaseAmountMinted(amountMintedChange){
        amountMinted += amountMintedChange;
        // loop over debt pools to run IDebtPool(debtPool).increaseAmountMinted here?
    }

    // This is "The amount minted (vsusd) delegated to this fund has decreased, so we need to track this."
    // This needs to be called on burn in collateral manager and on leave join
    function decreaseAmountMinted(amountMintedChange){
        amountMinted -= amountMintedChange;
        // loop over debt pools to run IDebtPool(debtPool).decreaseAmountMinted here?

    }

    // This is "This fund is allocating a different percentage of collateral to a specified debt pool, so we need to let the debt pool know about the change to all of the collateral.
    function setDebtPosition(address debtPoolAddress, uint256 newPosition){
        for (uint i=0; i<collateralTypes.length; i++) {
            address collateralType = collateralTypes[i];

            uint collateralAmount = CollateralManager.amounts[collateralType].amountDeposited[fund]; // this needs to sort of "join" through the accounts to get to the collateral available
            uint currentPosition = positions[debtPoolAddress];
            uint currentCollateralAllocation = collateralAmount * currentPosition;
            positions[debtPoolAddress] = newPosition;
            uint newCollateralAllocation = collateralAmount * positions[debtPoolAddress];

            if(newCollateralAllocation > currentCollateralAllocation){
                IDebtPool(debtPool).increaseStake(fundId, collateralType, newCollateralAllocation - currentCollateralAllocation, amountMinted * positions[debtPoolAddress]);
                IDebtPool(debtPool).increaseAmountMinted((amountMinted * newPosition) - (amountMinted * currentPosition));
            } else if(newCollateralAllocation < currentCollateralAllocation){
                IDebtPool(debtPool).decreaseStake(fundId, collateralType, currentCollateralAllocation - newCollateralAllocation, amountMinted * positions[debtPoolAddress]);
                IDebtPool(debtPool).decreaseAmountMinted((amountMinted * currentPosition) - (amountMinted * newPosition));
            }
        }
    }

    function getDebt() public {
        uint totalFundDebtInflation = 0;
        for (uint i=0; i<debtPoolAddreses.length; i++) { // This is a scary loop, at minimum we should be storing a list on the account of debt pools where the user has a non-zero position, accounting for delegation
            IDebtPool debtPool = IDebtPool(debtPoolAddreses[i]);
            IERC20 synth = IERC20(debtPool.synth()); 

            uint256 netDebtInflation = synth.totalSupply() * debtPool.price() - sUSD.balanceOf(address(this));
            uint256 fundDebtInflation = (debtPool.debtInflationShares[id] / debtPool.totalDebtInflationShares) * (netDebtInflation + debtPool.totalVsusd) - debtPool.vsUSD[id];
            totalFundDebtInflation += fundDebtInflation;
        }

        return totalFundDebtInflation;
    }
}