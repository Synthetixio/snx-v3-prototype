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
        // leave fund if necessary

        // like mint/burn:
        // update collateral allocation
        // update the amountMinted on the Fund to include my amount
    }

    function leaveFund(){

        // like mint/burn:
        // update collateral allocation
        // update the amountMinted on the Fund to decrease by my amount
    }

    function getCollateralizationRatio(uint256 accountId) public {
        uint accountDebtInflation = fund.getDebtInflation() * (Fund.amountMintedByUser[accountId] / Fund.amountMinted);
        return accountStakedValue / (Bank.amountMinted[account] + accountDebtInflation);
    }

    function getMinimumCollateralizationRatio(uint256 id) public {
        // This is a function of the c-ratio's associated with each collateral type, weighted by how much this account is in them
    }

    function burn(accountId) { // This is liquidation!
        require(getCollateralizationRatio(accountId) < getMinimumCollateralizationRatio(accountId));

        // Incentivize Liquidation

        // If the fund is liquidable, do that instead.
            // Fund.burn()

        // Else liquidate the account.
            fund.decreaseAmountMinted(fund.amountMintedByAccount[accountId]);
            // by burning the debt shares (above), the debt and collateral is socialized among other accounts in the fund

    }
}