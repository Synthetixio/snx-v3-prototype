// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.6;

import "../interfaces/IERC20.sol";
import "../interfaces/IERC721.sol";
import "../interfaces/ISynthetixProxy.sol";
import "@opengsn/contracts/src/BaseRelayRecipient.sol";

contract Onboarding is BaseRelayRecipient {
    string public override versionRecipient = "1.0.0";

    ISynthetixProxy synthetix;
    IERC721 accountToken;
    uint256 lastIdUsed;

    constructor(address _synthetixProxy, address _accountToken) {
        synthetix = ISynthetixProxy(_synthetixProxy);
        accountToken = IERC721(_accountToken);
    }

    function onboard(address collateralType, uint256 amount) external returns (uint256) {
        // Receive collateral
        IERC20(collateralType).transferFrom(_msgSender(), address(this), amount);

        // Find the next available account id
        while (accountToken.ownerOf(lastIdUsed) != address(0)) {
            lastIdUsed++;
        }

        // Create account
        accountToken.mint(lastIdUsed);

        // Approve transfer of collateral to Synthetix
        IERC20(collateralType).approve(address(synthetix), amount);

        // Stake collateral
        uint256 fundId = synthetix.getPreferredFund();
        synthetix.stake(lastIdUsed, collateralType, amount);
        synthetix.delegateCollateral(fundId, lastIdUsed, collateralType, amount, 1 ether);

        // Provide the account token
        accountToken.safeTransferFrom(address(this), _msgSender(), lastIdUsed);

        // Sanity check
        require(IERC20(collateralType).balanceOf(address(this)) == 0, "Incorrect amount of collateral transferred.");

        // Emit event
        emit Onboarded(_msgSender(), lastIdUsed, collateralType, amount, fundId);

        return lastIdUsed;
    }

    event Onboarded(
        address indexed sender,
        uint256 indexed accountId,
        address indexed collateralType,
        uint256 amount,
        uint256 fundId
    );
}
