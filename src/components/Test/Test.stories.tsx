import React, { useState } from "react";
import Test from "./Test";

export default {
  title: "OTHERS/MDXTest",
  component: Test,
};

const Template = (args) => <Test {...args} />;
export const Unchecked = Template.bind({});
Unchecked.args = { label: "ssss" };
