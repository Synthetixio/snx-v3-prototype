import { atom } from 'recoil'

export const collateralTypesState = atom({
    key: 'collateralTypes',
    default: [
        {
            ticker: "SNX",
            address: "0x0000000000000000000000000000000000000000",
            icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png",
            decimals: 18
        },
        {
            ticker: "LUSD",
            address: "0xa36085f69e2889c224210f603d836748e7dc0088",
            icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x5f98805A4E8be255a32880FDeC7F6728C6568bA0/logo.png",
            decimals: 18
        },
        {
            ticker: "ETH",
            address: "0xa36085f69e2889c224210f603d836748e7dc0088",
            icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
            decimals: 18
        },
    ]
})