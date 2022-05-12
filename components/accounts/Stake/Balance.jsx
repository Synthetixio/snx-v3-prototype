import { useAccount, useContractRead, erc20ABI } from "wagmi";
import { Text, Badge } from "@chakra-ui/react";

export default function Balance({ tokenAddress, onUseMax }) {
  const { data: accountData } = useAccount();
  const accountAddress = accountData?.address;

  const { data: balanceData } = useContractRead(
    {
      addressOrName: tokenAddress,
      contractInterface: erc20ABI,
    },
    "balanceOf",
    {
      args: accountAddress,
    }
  );
  const balance = balanceData || 0;
  // Needs a special case for ETH/wETH?

  return (
    <Text fontSize="xs">
      Balance: {balance.toLocaleString()}
      <Badge
        as="button"
        ml="2"
        variant="outline"
        colorScheme="blue"
        transform="translateY(-1px)"
        onClick={() => {
          onUseMax(balance);
        }}
      >
        Use Max
      </Badge>
    </Text>
  );
}
