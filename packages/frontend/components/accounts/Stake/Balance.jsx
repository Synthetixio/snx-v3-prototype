import { collateralTypesState } from "../../../state/index";
import { Text, Badge, Link } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { useRecoilState } from "recoil";

export default function Balance({ balance, tokenAddress, onUseMax }) {
  const [collateralTypes] = useRecoilState(collateralTypesState); // to get decimals for display
  const collateralType = collateralTypes[tokenAddress];
  if (collateralType) {
    balance = balance.div(BigNumber.from(10).pow(collateralType.decimals));
  }
  // Needs a special case for ETH/wETH?

  return collateralType ? (
    <Text fontSize="xs">
      Balance: {balance.toLocaleString()} {collateralType.ticker}
      {balance == 0 ? (
        false && (
          <Link>
            <Badge
              as="button"
              ml="2"
              variant="outline"
              colorScheme="blue"
              transform="translateY(-2px)"
            >
              Buy {collateralType.ticker}
            </Badge>
          </Link>
        )
      ) : (
        <Badge
          as="button"
          ml="2"
          variant="outline"
          colorScheme="blue"
          transform="translateY(-2px)"
          onClick={() => {
            onUseMax(balance);
          }}
        >
          Use Max
        </Badge>
      )}
    </Text>
  ) : null;
}
