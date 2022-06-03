import { ethers } from 'ethers';

export function tryToBN(v: string, decimals: number): ethers.BigNumber|null {

    //console.log(v, ethers.utils.parseUnits(v, decimals));
    try {
        return ethers.utils.parseUnits(v, decimals);
    } catch(err) {
        return null;
    }
}