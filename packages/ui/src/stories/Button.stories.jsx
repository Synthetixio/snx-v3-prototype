import { Button } from "./Button";

export default {
  title: "Buttons",
  component: Button,
};

const Template = args => <Button {...args} />;

export const Brand = Template.bind({});
Brand.args = {
  colorScheme: "brand",
  label: "Button",
};

export const Red = Template.bind({});
Red.args = {
  colorScheme: "red",
  label: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "lg",
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "sm",
  label: "Button",
};
