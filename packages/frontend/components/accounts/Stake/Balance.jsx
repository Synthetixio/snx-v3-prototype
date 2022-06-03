import { collateralTypesState } from "../../../state/index";
import { Text, Badge, Link } from "@chakra-ui/react";
import ethers from "ethers";

export default function Balance({ balance, collateralType, onUseMax }) {
  // Needs a special case for ETH/wETH?

  return collateralType ? (
    <Text fontSize="xs">
      Balance:{" "}
      {ethers.utils.commify(
        ethers.utils.formatUnits(balance, collateralType.decimals)
      )}{" "}
      {collateralType.ticker}
      {balance.eq(0) ? (
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
