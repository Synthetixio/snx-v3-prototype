//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract Account is ERC721 { // or ERC1155 with all the synth-level stuff in it??
    
    mapping(uint256 => uint256) public delegatedDebtPosition;

    function mint(uint256 id) external { // effectively "create account"
        // Optionally, stakes something to start, could be 0 for LP token just for delegation/fund management?
        setDebtPosition(id); // or delegate?
    }

    function setDebtPosition(uint256 id, address debtPoolAddress, uint256 amount) public {
        if(delegatedDebtPosition[id]){
            delete delegatedDebtPosition[id]; // undo delegation if it's set, Also we need to make sure IDs start at 1 and not 0?
            // but I think we need to write position for the other pools into this user's config first?
            // Could also just prevent this before "undelegating" but I think we want this to be one transaction in the UI.
        }

         // All the logic below needs to be updated to account for the scenario where amount is lower than the current value
        IDebtPool debtPool = IDebtPool(debtPoolAddress);
        IERC20 synth = IERC20(debtPool.synth());

        debtPool.debtPositions[id] = amount;
        debtPool.supplyCap += amount; // We're trying to come up with a dynamic version of this in DebtPool `supplyCap()`
        
        uint256 exposureIncreaseValue = 0; //get market rate of amount, does not include exchange fees
        debtPool.vsUSD[id] += exposureIncreaseValue;
        debtPool.totalVsusd += exposureIncreaseValue;

        debtPool.debtInflationShares[id] += exposureIncreaseValue;
        // Line above needs to be more like
        /*
        if (debtPool.totalDebtInflationShares == 0) {
            debtPool.debtInflationShares[staker] = amount
        } else {
            debtPool.debtInflationShares[staker] = debtPool.debtInflationShares[staker] ? debtPool.debtInflationShares[staker] : 0
            debtPool.debtInflationShares[staker] += amount * debtPool.totalDebtInflationShares / debtPool.totalDebtInflationShares
        }
        */

        debtPool.totalDebtInflationShares += exposureIncreaseValue; // This needs to be updated to reflect the actual change, once the logic above is corrected.
    }

    function setDebtPositionDelegation(uint256 id, address delegatee) public {
        delegatedDebtPosition[id] = delegatee;
    }

    function getDebtPosition(uint256 id, address debtPoolAddress) public {
        if(delegatedDebtPosition[id]){
            return getDebtPosition(delegatedDebtPosition[id], debtPoolAddress);
        }
        
        IDebtPool debtPool = IDebtPool(debtPoolAddress);
        return debtPool.debtPositions[id];
    }

    function getCollateralizationRatio(uint256 id) public {
        uint totalUserDebtInflation = 0;
        for (uint i=0; i<debtPoolAddreses.length; i++) { // This is a scary loop, at minimum we should be storing a list on the account of debt pools where the user has a non-zero position, accounting for delegation
            IDebtPool debtPool = IDebtPool(debtPoolAddreses[i]);
            IERC20 synth = IERC20(debtPool.synth()); 

            uint256 netDebtInflation = synth.totalSupply() * debtPool.price() - sUSD.balanceOf(address(this));
            uint256 userDebtInflation = (debtPool.debtInflationShares[id] / debtPool.totalDebtInflationShares) * (netDebtInflation + debtPool.totalVsusd) - debtPool.vsUSD[id];
            totalUserDebtInflation += userDebtInflation;
        }

        uint256 userDebt = Bank.amountMinted[stakerToken] + totalUserDebtInflation;
        uint256 stakedValue = Bank.amountDeposited[staker] * snxPrice;
        return stakedValue / userDebt;
    }

    function getMinimumCollateralizationRatio(uint256 id) public {
        // Can we have pool specific c-ratios?
        // Average of the pools' c-ratios, weighted by user position?
    }

}
