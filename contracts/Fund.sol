//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

// Is "Fund" the right name for this contract? Maybe "StakingPosition"? Maybe "Vault"?
contract Fund { // Make this an ERC721 and file all the data under ids? also look at https://eips.ethereum.org/EIPS/eip-4626 ?
    // Manages relationship between percentages (or "weights"), collateral amounts, and debt pool logic (vUSD, debtinflationshares, and cached supply cap)

    mapping(address => uint256) public positions; // mapping of debt pool to "percentage exposure"
    uint256 public amountMinted; // total amount of vsUSD delegated to this fund, more like "amountDelegated" or "amountDelegatedToMe"

    mapping(uint256 => uint256) lpShares; // account -> amount of lp shares
    uint256 totalLpShares;

    // This is "The amount minted (vsusd) delegated to this fund has increased, so we need to track this."
    function increaseAmountMinted(amountMintedChange){

        uint newLpShares = amountMintedChange * totalLpShares / (getDebtInflation() + amountMinted);
        lpShares[accountId] += newLpShares;
        totalLpShares += newLpShares;

        amountMinted += amountMintedChange;

        for (uint i=0; i<debtPoolAddresses.length; i++) { 
            IDebtPool debtPool = IDebtPool(debtPoolAddresses[i]);
            uint amountForPool = amountMinted * position[debtPoolAddresses[i]];
            debtPool.increaseLiquidity(fundId, amountForPool); // this is actually expecting amount change
        }
    }

    // This is "The amount minted (vsusd) delegated to this fund has decreased, so we need to track this."
    function decreaseAmountMinted(amountMintedChange){

        uint lostLpShares = amountMintedChange * totalLpShares / (getDebtInflation() + amountMinted);
        lpShares[accountId] -= lostLpShares;
        totalLpShares -= lostLpShares;

        amountMinted -= amountMintedChange;
        
        for (uint i=0; i<debtPoolAddresses.length; i++) { 
            IDebtPool debtPool = IDebtPool(debtPoolAddresses[i]);
            uint amountForPool = amountMinted * position[debtPoolAddresses[i]];
            debtPool.decreaseLiquidity(fundId, amountForPool); // this is actually expecting amount change
        }

    }

    // This is "This fund is allocating a different percentage of collateral to a specified debt pool, so we need to let the debt pool know about the change to all of the collateral.
    function setDebtPosition(address debtPoolAddress, uint256 newPosition){
        IDebtPool debtPool = IDebtPool(debtPoolAddress);

        uint currentAmountForPool = amountMinted * position[debtPoolAddress];
        uint newAmountForPool = amountMinted * newPosition;
        
        if(currentAmountForPool < newAmountForPool){
            debtPool.increaseLiquidity(fundId, newAmountForPool - currentAmountForPool);
        } else if(currentAmountForPool > newAmountForPool){
            debtPool.decreaseLiquidity(fundId, currentAmountForPool - newAmountForPool);
        }

        position[debtPoolAddress] = newAmountForPool;
    }

    function getDebtInflation() public {
        uint totalFundDebtInflation = 0;
        for (uint i=0; i<debtPoolAddresses.length; i++) {
            IDebtPool debtPool = IDebtPool(debtPoolAddresses[i]);
            IERC20 synth = IERC20(debtPool.synth()); 
            uint256 netDebtInflation = synth.totalSupply() * synth.price() - sUSD.balanceOf(debtPoolAddresses[i]);
            uint256 fundDebtInflation = (debtPool.debtShares[id] / debtPool.totalDebtShares) * (netDebtInflation + debtPool.totalVsusd) - debtPool.vsUSD[id];
            totalFundDebtInflation += fundDebtInflation;
        }

        return totalFundDebtInflation;
    }
}