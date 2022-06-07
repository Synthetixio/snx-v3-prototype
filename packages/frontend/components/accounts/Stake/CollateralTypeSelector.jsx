import { collateralTypesState } from '../../../state/index';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useState, useEffect, useContext } from 'react';
import { InitContext } from '../../Init';

export default function CollateralTypeSelector({ handleChange }) {
  // on loading dropdown and token amount https://chakra-ui.com/docs/components/feedback/skeleton ?

  const { collateralTypes } = useContext(InitContext);
  const [collateralType, setCollateralType] = useState(collateralTypes[0]);
  useEffect(() => {
    handleChange(collateralType);
  }, [collateralType, handleChange]);

  useEffect(() => {
    console.log('collateral type callback hit', collateralTypes.length);
    if (collateralTypes.length) {
      console.log('setting collateral type', collateralTypes[0].symbol);
      setCollateralType(collateralTypes[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collateralTypes.length]);

  return (
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
            {collateralType && <Image
              alt="collateral image"
              width="24"
              height="24"
              src={collateralType?.logoURI}
            />}
          </Box>
          <Text fontWeight="600">{collateralType?.symbol}</Text>
          <ChevronDownIcon opacity="0.66" w="5" h="5" ml="4" mr="2" />
        </Flex>
      </MenuButton>
      <MenuList px={2} bg="black" border="1px solid rgba(255,255,255,0.33)">
        {Object.values(collateralTypes).map(collateralType => (
          <MenuItem
            key={collateralType.symbol}
            alignItems="left"
            mb={1}
            flexDirection="column"
            _hover={{ bg: 'gray.800' }}
            _focus={{ bg: 'gray.800' }}
            _active={{ bg: 'gray.800' }}
            onClick={() => {
              setCollateralType(collateralType);
            }}
          >
            <Flex flexDirection="row">
              <Box
                w="24px"
                h="24px"
                borderRadius="12px"
                overflow="hidden"
                mr="2"
              >
                {collateralType && <Image
                  alt="collateral image"
                  width="24"
                  height="24"
                  src={collateralType?.logoURI}
                />}
              </Box>
              <Text fontWeight="600">{collateralType?.symbol}</Text>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
