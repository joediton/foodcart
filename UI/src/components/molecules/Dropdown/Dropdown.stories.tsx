
import type { Meta, StoryObj } from "@storybook/react";

import Dropdown from "./Dropdown";

const meta = {
    title: "Atoms/Dropdown",
    component: Dropdown,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        toggler: "Click me",
        children: "Hello",
    }
};