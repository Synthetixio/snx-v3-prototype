import { Button as ChakraButton } from "@chakra-ui/react";

export const Button = ({ label, ...props }) => {
  return <ChakraButton {...props}>{label}</ChakraButton>;
};
