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
import { useRecoilState } from "recoil";
import { collateralTypesState } from "../../../state/index";

export default function CollateralTypeSelector({ handleChange }) {
  // on loading dropdown and token amount https://chakra-ui.com/docs/components/feedback/skeleton ?

  const [collateralTypes] = useRecoilState(collateralTypesState);
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
