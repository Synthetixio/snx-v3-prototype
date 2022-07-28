import { Heading as ChakraHeading } from "@chakra-ui/react";

export const Heading = ({ label, ...props }) => {
  return <ChakraHeading {...props}>{label}</ChakraHeading>;
};
