import type { Meta, StoryObj } from "@storybook/react";

import Text from "./Text";

const meta = {
  title: "Atoms/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  decorators: [(Story) => {
    return (
      <div className="max-w-[700px]">
        <Story />
      </div>
    )
  }]
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};