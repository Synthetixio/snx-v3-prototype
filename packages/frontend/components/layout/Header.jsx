import kwenta from "../../public/kwenta.svg";
import logo from "../../public/logo.png";
import lyra from "../../public/lyra.svg";
import NetworkController from "./NetworkController";
import { ChevronDownIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

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
              <PopoverBody bg="gray.800" color="white" p="5">
                <NextLink href="http://kwenta.io" isExternal>
                  <Flex mb="2" cursor="pointer">
                    <Image src={kwenta} alt="Kwenta" width={36} height={36} />
                    <Box pl="3">
                      <Text fontWeight="500">Kwenta</Text>
                      <Text fontSize="xs">
                        Trade perpetual futures with up to 10x leverage.
                      </Text>
                    </Box>
                  </Flex>
                </NextLink>
                <NextLink href="http://lyra.finance" isExternal>
                  <Flex cursor="pointer">
                    <Image src={lyra} alt="Lyra" width={36} height={36} />
                    <Box pl="3">
                      <Text fontWeight="500">Lyra</Text>
                      <Text fontSize="xs">
                        The first completely decentralized options protocol.
                      </Text>
                    </Box>
                  </Flex>
                </NextLink>
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
