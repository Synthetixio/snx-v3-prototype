import { atom } from 'recoil'

export const collateralTypesState = atom({
    key: 'collateralTypes',
    default: {
        "0x022E292b44B5a146F2e8ee36Ff44D3dd863C915c": {
            // Include this for loading UX, this is displayed on first load in the menu, will need to switch based on network or fix loading pattern
            address: "0x022E292b44B5a146F2e8ee36Ff44D3dd863C915c",
            ticker: "SNX",
            icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png",
            decimals: 18
        }
    }
})