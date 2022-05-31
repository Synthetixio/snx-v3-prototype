// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import "hardhat/console.sol";

contract Onboarding {
    address snxProxy;
    uint256 lastId; // last found ID on previous onboard call

    constructor(address _snxProxy) {
        snxProxy = _snxProxy;
    }

    function onboard(address collateralType, uint256 amount) external {
        // 1. transfer in collateral using above address
        // ierc20: use transferFrom
        // 2. create account: NFT mint erc-721
        // 2a. while loop: find next id not used
        // 2b. accountmodule: snxProxy -> createAccount(foundId)
        // 2c. store lastId in storage for next use
        // 3. assign collateral to above account (SNX proxy) use lastId
        // 4. join the spartan council preferred fund
        // 4a. get preferred fund (SNXProxy -> getPreferredFund)
        // 5. transfer account token to msg.sender
        // emit event
    }
}
