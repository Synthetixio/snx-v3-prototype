import { Text, Link, Tooltip } from "@chakra-ui/react";

export default function Address({ address, displayFullAddress }) {
  // ENS support here?
  const addressDisplay = displayFullAddress
    ? address
    : `${address.slice(0, 6)}....${address.slice(-4)}`;
  return (
    <Text>
      {addressDisplay}
      <Link d="inline-block" opacity="0.66" ml="2">
        <Tooltip label="View Account on Tenderly">
          <img width="10" height="10" src="/tenderly.svg" />
        </Tooltip>
      </Link>
      <Link d="inline-block" opacity="0.66" ml="2">
        <Tooltip label="View Account on Etherscan">
          <img width="10" height="10" src="/etherscan.svg" />
        </Tooltip>
      </Link>
    </Text>
  );
}
