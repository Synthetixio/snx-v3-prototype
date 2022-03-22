//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract Account is ERC721 {

    // will have other functions for ownership and permissions, etc.
    
    mapping(uint256 => address) public ownedFund;
    mapping(uint256 => address) public fund;

    function mint(uint256 id) external { // effectively "create account"
        // creates and sets ownedFund[id];
        // Optionally, stakes something to start, could be 0 for LP token just for delegation/fund management?
        setDebtPosition(id); // or delegate?
    }

    function setDebtPosition() {
        if(delegatedDebtPosition[id]){
            delete delegatedDebtPosition[id]; // undo delegation if it's set, Also we need to make sure IDs start at 1 and not 0?
            // but I think we need to write position for the other pools into this user's config first?
            // Could also just prevent this before "undelegating" but I think we want this to be one transaction in the UI.

            // Create fund if necessary
        }
        Fund.setDebtPosition();
    }

    function setDebtPositionDelegation(uint256 id, address delegatee) public {
        delegatedDebtPosition[id] = delegatee;
        // debtshares type system to track what percentage of the the delegated funds this account is providing
    }

    function getDebtPosition(uint256 id, address debtPoolAddress) public {
        if(delegatedDebtPosition[id]){
            return getDebtPosition(delegatedDebtPosition[id], debtPoolAddress);
        }
        
        IDebtPool debtPool = IDebtPool(debtPoolAddress);
        return debtPool.debtPositions[id];
    }

    function getCollateralizationRatio(uint256 id) public {
        uint accountDebt = fund.getDebt() / myShareOfTheFund; // I think myShareOfTheFund might be seperated by collateral type?
        return accountStakedValue / accountDebt;
    }

    function getMinimumCollateralizationRatio(uint256 id) public {
        // This is a function of the c-ratio's associated with each collateral type, weighted by how much this account is in them
    }
}