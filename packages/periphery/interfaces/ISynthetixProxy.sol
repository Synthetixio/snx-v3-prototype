//SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

interface ISynthetixProxy {
    function createAccount(uint256 accountId) external;

    function stake(
        uint256 accountId,
        address collateralType,
        uint256 amount
    ) external;

    function getPreferredFund() external view returns (uint256);

    function delegateCollateral(
        uint256 fundId,
        uint256 accountId,
        address collateralType,
        uint256 amount,
        uint256 leverage
    ) external;

    function transferAccount(address to, uint256 accountId) external;
}
