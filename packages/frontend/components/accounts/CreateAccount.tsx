import Stake from "./Stake";
import { Heading, Text, Link, UnorderedList, ListItem } from "@chakra-ui/react";

export default function CreateAccount() {
  return (
    <>
      <Text fontSize="lg" mb="4">
        Stake with Synthetix to enable the creation of synthetic assets
        on-chain. You earn yield but must also maintain your C-Ratio.{" "}
        <Link
          href="https://snx-v3-docs.netlify.app/"
          fontWeight="semibold"
          color="blue.400"
        >
          Learn more
        </Link>
      </Text>
      <Stake createAccount />
      <Heading
        size="xs"
        mb="3"
        color="gray.300"
        fontWeight="300"
        textTransform="uppercase"
        letterSpacing="1.5px"
      >
        How it works
      </Heading>
      <UnorderedList>
        <ListItem mb="2">
          By default, your staking position will be managed by the{" "}
          <Link>Spartan Council</Link>, a DAO elected by stakers of SNX.{" "}
          <Link
            fontWeight="semibold"
            color="blue.400"
            isExternal
            href="https://governance.synthetix.io"
          >
            Go vote
          </Link>
        </ListItem>
        <ListItem mb="2">
          Currently, your projected rewards are{" "}
          <strong>X% APY in sUSD plus Y% APY in SNX</strong> and you’ll need to
          maintain a C-Ratio of at least Z%.
        </ListItem>
        <ListItem mb="2">
          Once you stake, we’ll walk you through C-Ratio maintenance.
        </ListItem>
      </UnorderedList>
    </>
  );
}
