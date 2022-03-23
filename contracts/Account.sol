//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract Account is ERC721 {
    // Also look at https://eips.ethereum.org/EIPS/eip-4626 ?

    // will have other functions for ownership and permissions, etc.
    
    mapping(uint256 => address) public ownedFund;
    mapping(uint256 => address) public fund;

    function mint(uint256 id, uint fundId) external { // effectively "create account"
        _mint(id);
        joinFund(uint256 id, uint fundId); // or delegate?
    }

    function joinFund(){

    }

    function leaveFund(){

    }

    function getCollateralizationRatio(uint256 id) public {
        uint accountDebt = fund.getDebt() * (Fund.lpShares[id] / Fund.totalLpShares());
        return accountStakedValue / (Bank.amountMinted[account] + accountDebt);
    }

    function getMinimumCollateralizationRatio(uint256 id) public {
        // This is a function of the c-ratio's associated with each collateral type, weighted by how much this account is in them
    }

    function burn() {
        // This is liquidation!
    }
}