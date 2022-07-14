import {
  SettingsIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
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

export default function Subnav() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Flex mb="6" alignItems="center">
      <div fontWeight="semibold" fontSize="md">
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
            {/*
              TODO: List all accounts owned by connected wallet here

            <MenuItem
              _hover={{ bg: "gray.800" }}
              _focus={{ bg: "gray.800" }}
              _active={{ bg: "gray.800" }}
            >
              Account #123
            </MenuItem>
            <MenuItem
              _hover={{ bg: "gray.800" }}
              _focus={{ bg: "gray.800" }}
              _active={{ bg: "gray.800" }}
            >
              Account #321
            </MenuItem>
        */}
            <MenuItem
              _hover={{ bg: "gray.800" }}
              _focus={{ bg: "gray.800" }}
              _active={{ bg: "gray.800" }}
            >
              <NextLink href={"/accounts/create"} passHref>
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
