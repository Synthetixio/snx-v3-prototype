import { useAccount, useContractWrite } from "wagmi";

export const useMulticall = (calls) => {
    const { isError } = useAccount() // is this the right way to check for this?
    if (isError) {
        // if wallet isn't connected, trigger a toast and open the connect wallet ui
    }

    // merge calls here
    return useContractWrite(
        {
            addressOrName: process.env.NEXT_PUBLIC_MULTICALL_ADDRESS,
            contractInterface: [],
        },
        "feed"
    );
}