import type { Meta, StoryObj } from "@storybook/react";
import App from "./App";
import { getUserMeals } from "./mock";

const meta = {
    title: "Foodcart App",
    component: App,
    parameters: {
        layout: "centered",
        msw: [getUserMeals]
    },
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};