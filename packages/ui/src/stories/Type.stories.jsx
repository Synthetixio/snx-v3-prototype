import { Heading } from "./Type";

export default {
  title: "Headings",
  component: Heading,
};

const Template = args => <Heading {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: "lg",
  label: "Heading",
};

export const Small = Template.bind({});
Small.args = {
  size: "sm",
  label: "Heading",
};
