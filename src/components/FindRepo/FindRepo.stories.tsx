import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { FindRepo, FindRepoProps } from "./FindRepo";

export default {
  title: "FindRepo",
  component: FindRepo
} as Meta;

const Template: Story<FindRepoProps> = args => <FindRepo {...args} />;

export const Primary = Template.bind({});
