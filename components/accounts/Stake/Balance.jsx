import { Text, Badge } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { collateralTypesState } from "../../../state/index";
import { BigNumber } from "ethers";

export default function Balance({ balance, tokenAddress, onUseMax }) {
  const [collateralTypes] = useRecoilState(collateralTypesState); // to get decimals for display
  const collateralType = collateralTypes[tokenAddress];
  if (collateralType) {
    balance = balance.div(BigNumber.from(10).pow(collateralType.decimals));
  }
  // Needs a special case for ETH/wETH?

  return (
    <Text fontSize="xs">
      Balance: {balance.toLocaleString()}{" "}
      {collateralType && collateralType.ticker}
      <Badge
        as="button"
        ml="2"
        variant="outline"
        colorScheme="blue"
        transform="translateY(-2px)"
        visibility={balance == 0 ? "hidden" : "visible"}
        onClick={() => {
          onUseMax(balance);
        }}
      >
        Use Max
      </Badge>
    </Text>
  );
}
