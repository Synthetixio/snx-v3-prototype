//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract Account is ERC721 {
    // or ERC1155 with all the synth-level stuff in it??

    // mapping(id => address) public delegatedDebtPosition; maybe?

    function mint(uint256 id) external {
        // Optionally, stakes something to start, could be 0 for LP token just for delegation/fund management?
        setDebtPosition(id); // or delegate?
    }

    function setDebtPositionDelegation(uint256 id, address delegatee) public {
    }

    function setDebtPosition(uint256 id, bytes asset, uint256 amount) public {
        // undo delegation if it's set

        // getSynth(id).debtPositions[id] = amount
        // getSynth(id).supplyCap += amount
        
        // exposureIncreaseValue = get market rate of amount
        // getSynth(id).vsUSD[id] += exposureIncreaseValue
        // getSynth(id).totalVsusd += exposureIncreaseValue
        // getSynth(id).debtInflationShares[id] += exposureIncreaseValue
        
        // Update Debt Inflation Shares
        /*
        if (getSynth(id).totalDebtInflationShares == 0) {
            getSynth(id).debtInflationShares[staker] = amount
        } else {
            getSynth(id).debtInflationShares[staker] = getSynth(id).debtInflationShares[staker] ? getSynth(id).debtInflationShares[staker] : 0
            getSynth(id).debtInflationShares[staker] += amount * getSynth(id).totalDebtInflationShares / getSynth(id).totalDebtInflationShares
        }
        */

        // also update getSynth(id).totalDebtInflationShares: getSynth(id).totalDebtInflationShares =+ newAmount

    }

    function getDebtPosition(uint256 id, bytes32 asset) public {
        // check delegated
        // otherwise check debt position
    }

    function getCollateralizationRatio(uint256 id) public {

        // Can we have pool specific c-ratios?

        /*
        uint256 netDebtInflation = totalSupply() * price - sUSD.balanceOf(address(this));
        uint256 userDebtInflation = (debtInflationShares[id] / totalDebtInflationShares) * (netDebtInflation + totalVsusd) - vsUSD[id];

        // sum the above across all pools to get `totalUserDebtInflation`

        uint256 userDebt = Bank.amountMinted[stakerToken] + totalUserDebtInflation;
        uint256 stakedValue = Bank.amountDeposited[staker] * snxPrice;
        return stakedValue / userDebt;
        */
    }

}
