import kwenta from "../../public/kwenta.svg";
import logo from "../../public/logo.png";
import lyra from "../../public/lyra.svg";
import thales from "../../public/thales.svg";
import { NetworkController } from "./NetworkController";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
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
  Text,
  IconButton,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";

export default function Header() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

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
        <Box display={["none", "none", "none", "inline-block"]}>
          <NextLink href={"/"} passHref>
            <Link _focus={{ boxShadow: "none" }} mx="3" fontWeight="semibold">
              Stake
            </Link>
          </NextLink>
          <Link
            _focus={{ boxShadow: "none" }}
            mx="3"
            fontWeight="semibold"
            href={"https://governance.synthetix.io/"}
            isExternal
          >
            DAO
          </Link>
          <Link
            _focus={{ boxShadow: "none" }}
            mx="3"
            fontWeight="semibold"
            href={"https://snx-v3-docs.netlify.app/"}
            isExternal
          >
            Developers
          </Link>
          <Popover trigger="hover" variant="responsive">
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
            <PopoverContent border="none" maxWidth="260px">
              <PopoverArrow bg="gray.800" />
              <PopoverBody bg="gray.800" color="white" p="5">
                <a href="https://kwenta.io" target="_blank" rel="noreferrer">
                  <Flex mb="3" cursor="pointer">
                    <Image src={kwenta} alt="Kwenta" width={36} height={36} />
                    <Box pl="3">
                      <Text fontWeight="500">Kwenta</Text>
                      <Text fontSize="xs">
                        Trade perpetual futures with up to 10x leverage.
                      </Text>
                    </Box>
                  </Flex>
                </a>
                <a href="https://lyra.finance" target="_blank" rel="noreferrer">
                  <Flex mb="3" cursor="pointer">
                    <Image src={lyra} alt="Lyra" width={36} height={36} />
                    <Box pl="3">
                      <Text fontWeight="500">Lyra</Text>
                      <Text fontSize="xs">
                        The first completely decentralized options protocol.
                      </Text>
                    </Box>
                  </Flex>
                </a>
                <a
                  href="https://thalesmarket.io"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Flex cursor="pointer">
                    <Image src={thales} alt="Thales" width={36} height={36} />
                    <Box pl="3">
                      <Text fontWeight="500">Thales</Text>
                      <Text fontSize="xs">
                        A parimutuel markets protocol for price, sports, and
                        more.
                      </Text>
                    </Box>
                  </Flex>
                </a>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
        <Spacer />
        <Box>
          <NetworkController />
        </Box>
        <IconButton
          display={["inline-block", "inline-block", "inline-block", "none"]}
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          bg="gray.800"
          _hover={{ bg: "gray.700" }}
          onClick={toggleMobileMenu}
          ml="4"
        />
      </Flex>
    </Container>
  );
}
