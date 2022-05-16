import {
  Container,
  Flex,
  Box,
  Link,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";
import Image from "next/image";
import logo from "../../public/logo.png";
import NextLink from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import NetworkController from "./NetworkController";

export default function Header() {
  return (
    <Container mb="8" maxW="container.lg" py="4">
      <Flex alignItems="center">
        <Box>
          <NextLink href={"/"} passHref>
            <Link _focus={{ boxShadow: "none" }}>
              <Image src={logo} alt="Synthetix" width={200} height={14.5} />
            </Link>
          </NextLink>
        </Box>
        <Spacer />
        <Box>
          <NextLink href={"/"} passHref>
            <Link _focus={{ boxShadow: "none" }} mx="3" fontWeight="semibold">
              Stake
            </Link>
          </NextLink>
          <NextLink href={"/dao"} passHref>
            <Link _focus={{ boxShadow: "none" }} mx="3" fontWeight="semibold">
              DAO
            </Link>
          </NextLink>
          <Link
            _focus={{ boxShadow: "none" }}
            mx="3"
            fontWeight="semibold"
            href={"https://snx-v3-docs.netlify.app/"}
            isExternal
          >
            Developers
          </Link>
          <Popover trigger="hover">
            <PopoverTrigger>
              <Link
                _focus={{ boxShadow: "none" }}
                _hover={{ textDecoration: "none" }}
                mx="3"
                fontWeight="semibold"
              >
                Trade <ChevronDownIcon />
              </Link>
            </PopoverTrigger>
            <PopoverContent border="none">
              <PopoverArrow bg="gray.800" />
              <PopoverBody bg="gray.800" color="white">
                Link to Kwenta, Lyra, etc. with their icons and tagline
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
        <Spacer />
        <Box>
          <NetworkController />
        </Box>
      </Flex>
    </Container>
  );
}
