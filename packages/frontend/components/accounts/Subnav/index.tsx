import { accountsState } from "../../../state";
import {
  SettingsIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  CheckIcon,
} from "@chakra-ui/icons";
import {
  Text,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

export default function Subnav() {
  const router = useRouter();
  const [{ accounts: userAccounts }] = useRecoilState(accountsState);
  const { id } = router.query;

  return (
    <Flex mb="6" alignItems="center">
      <div style={{ fontWeight: "semibold", fontSize: "md" }}>
        {id ? `Account #${id}` : `Create Account`}
        <Menu>
          <MenuButton ml="1" transform="translateY(-1px)">
            <ChevronDownIcon />
          </MenuButton>
          <MenuList
            fontSize="xs"
            px="2"
            bg="black"
            border="1px solid rgba(255,255,255,0.33)"
          >
            {userAccounts.map(account => {
              const isCurrentAccount = id === account.toString();
              const menuItem = (
                <MenuItem
                  key={account}
                  _hover={{ bg: "gray.800" }}
                  _focus={{ bg: "gray.800" }}
                  _active={{ bg: "gray.800" }}
                >
                  <Flex alignItems="center">
                    {isCurrentAccount && <CheckIcon marginRight={1} />}

                    {account}
                  </Flex>
                </MenuItem>
              );

              return isCurrentAccount ? (
                menuItem
              ) : (
                <NextLink
                  href={{
                    pathname: `/accounts/${account}`,
                    query: {
                      chain: router.query.chain,
                    },
                  }}
                  key={account}
                  passHref
                >
                  {menuItem}
                </NextLink>
              );
            })}
            <MenuItem
              _hover={{ bg: "gray.800" }}
              _focus={{ bg: "gray.800" }}
              _active={{ bg: "gray.800" }}
            >
              <NextLink
                href={{
                  pathname: "/accounts/create",
                  query: {
                    chain: router.query.chain,
                  },
                }}
                passHref
              >
                <Link
                  _focus={{ boxShadow: "none" }}
                  _hover={{ textDecoration: "none" }}
                  fontWeight="semibold"
                >
                  Create new account
                </Link>
              </NextLink>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>

      {false && router.route.split("/").length == 3 && (
        <NextLink href={`/accounts/${id}/settings`} passHref>
          <Link
            ml="auto"
            fontSize="xs"
            fontWeight="normal"
            color="blue.400"
            _hover={{ textDecoration: "none" }}
          >
            <SettingsIcon transform="translateY(-1px)" />
            &nbsp;&nbsp;Account Settings
          </Link>
        </NextLink>
      )}
      {false && (
        <NextLink href={`/accounts/${id}`} passHref>
          <Link
            ml="auto"
            fontSize="xs"
            fontWeight="normal"
            color="blue.400"
            _hover={{ textDecoration: "none" }}
          >
            <ChevronLeftIcon transform="translateY(-1px)" /> Return to overview
          </Link>
        </NextLink>
      )}
    </Flex>
  );
}
