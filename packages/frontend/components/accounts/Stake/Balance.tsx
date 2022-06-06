import { Text, Badge, Link } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { CollateralType } from '../../../utils/constants'

export default function Balance({
  balance,
  collateralType,
  onUseMax,
}: {
  balance: ethers.BigNumber
  collateralType: CollateralType
  onUseMax: (max: ethers.BigNumber) => void
}) {
  // Needs a special case for ETH/wETH?

  return collateralType ? (
    <Text fontSize="xs">
      Balance:{' '}
      {parseFloat(
        ethers.utils.formatUnits(balance, collateralType.decimals),
      ).toLocaleString()}{' '}
      {collateralType.symbol}
      {balance.eq(0) ? (
        <Link>
          <Badge
            as="button"
            ml="2"
            variant="outline"
            colorScheme="blue"
            transform="translateY(-2px)"
          >
            Buy {collateralType.symbol}
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
            onUseMax(balance)
          }}
        >
          Use Max
        </Badge>
      )}
    </Text>
  ) : null
}
