import { StakingPositionType } from "./types";
import { InfoIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Text, Link, Tr, Td, IconButton } from "@chakra-ui/react";
import { utils, BigNumber } from "ethers";
import NextLink from "next/link";
import { useRouter } from "next/router";

export default function StakingPosition({
  position,
}: {
  position: StakingPositionType;
}) {
  const router = useRouter();
  const { id } = router.query;

  // If the connected wallet doesn’t own this account token, remove/disable the interactivity
  const {
    collateralAmount: collateralAmountBN,
    collateralType,
    fundId: fundIdBN,
  } = position;

  const formatValue = (value: BigNumber, decimals: number) =>
    parseInt(utils.formatUnits(value, decimals));

  const {
    decimals,
    price: priceBN,
    priceDecimals,
    symbol,
  } = position.collateralType;

  const collateralAmount = formatValue(collateralAmountBN, decimals);
  const price = formatValue(priceBN!, priceDecimals!);
  const collateralValue = collateralAmount * price;

  const debt = 0;

  return (
    <Tr>
      <Td py="4">
        <>
          ${collateralValue.toFixed(2)}
          <Text fontSize="xs" opacity="0.66" mt="1'">
            {collateralAmount.toFixed(0)} SNX
          </Text>
        </>
      </Td>
      <Td py="4">
        ${debt}
        <Text fontSize="xs" opacity="0.66" mt="1'">
          $X minted {/*or "burned"*/}
        </Text>
      </Td>
      <Td py="4">
        {debt <= 0 ? (
          <Text fontWeight="bold" color="green">
            No debt <InfoIcon transform="translateY(-1px)" />
          </Text>
        ) : (
          <>0%</>
        )}
        {/* collateralValue / debt * 100 */}
        {/* if under target:
        <Text fontWeight="bold" color="red">
          232% <WarningIcon transform="translateY(-1px)" />
        </Text>
        */}

        <Text fontSize="xs" opacity="0.66" mt="1'">
          {formatValue(
            collateralType!.minimumCRatio!.mul(BigNumber.from(100)),
            collateralType.decimals
          ).toFixed(0)}
          % Min.
        </Text>
      </Td>

      <Td>
        <NextLink href={`/funds/${fundIdBN.toNumber()}`} passHref>
          <Link
            _hover={{ textDecoration: "none" }}
            display="inline"
            borderBottom="1px dotted rgba(255,255,255,0.5)"
          >
            {position.fundName}
          </Link>
        </NextLink>
      </Td>
      <Td isNumeric>
        <NextLink
          href={`/accounts/${id}/positions/${symbol}-${fundIdBN.toNumber()}`}
        >
          <IconButton
            variant="link"
            saria-label="Details"
            icon={<ArrowRightIcon />}
          />
          {/* Probably should be 'horizontal three dots' icon but it's not in chakra icons and i don't wanna add another lib right now, maybe should be "Details" text on a button or something */}
        </NextLink>
      </Td>
    </Tr>
  );
}
