import {
  Box,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

export default function CollateralTypeSelector({ handleChange }) {
  // on loading dropdown and token amount https://chakra-ui.com/docs/components/feedback/skeleton ?

  // Probably need to do the call for this globally, will need access to decimals value on each of these in Balance and Stake/index.js component
  const collateralTypes = [
    {
      ticker: "SNX",
      address: "0x0000000000000000000000000000000000000000",
      icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png",
    },
    {
      ticker: "LUSD",
      address: "0xa36085f69e2889c224210f603d836748e7dc0088",
      icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x5f98805A4E8be255a32880FDeC7F6728C6568bA0/logo.png",
    },
    {
      ticker: "ETH",
      address: "0xa36085f69e2889c224210f603d836748e7dc0088",
      icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
    },
  ];

  const [collateralType, setCollateralType] = useState(collateralTypes[0]);
  useEffect(() => {
    handleChange(collateralType);
  }, [collateralType]);

  return (
    collateralTypes.length && (
      <Menu>
        <MenuButton
          border="1px solid rgba(255,255,255,0.33)"
          borderRadius="6px"
          alignItems="center"
          cursor="pointer"
          type="button"
        >
          <Flex>
            <Box
              w="24px"
              h="24px"
              borderRadius="12px"
              overflow="hidden"
              ml="3.5"
              mr="2"
            >
              <img width="24" height="24" src={collateralType.icon} />
            </Box>
            <Text fontWeight="600">{collateralType.ticker}</Text>
            <ChevronDownIcon opacity="0.66" w="5" h="5" ml="4" mr="2" />
          </Flex>
        </MenuButton>
        <MenuList px={2} bg="black" border="1px solid rgba(255,255,255,0.33)">
          {collateralTypes.map((collateralType, ind) => (
            <MenuItem
              key={collateralType.ticker}
              alignItems="left"
              mb={1}
              flexDirection="column"
              _hover={{ bg: "gray.800" }}
              _focus={{ bg: "gray.800" }}
              _active={{ bg: "gray.800" }}
              onClick={() => setCollateralType(collateralTypes[ind])}
            >
              <Flex flexDirection="row">
                <Box
                  w="24px"
                  h="24px"
                  borderRadius="12px"
                  overflow="hidden"
                  mr="2"
                >
                  <img width="24" height="24" src={collateralType.icon} />
                </Box>
                <Text fontWeight="600">{collateralType.ticker}</Text>
              </Flex>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    )
  );
}
