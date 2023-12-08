import type { Meta, StoryObj } from "@storybook/react";
import App from "./App";

const meta = {
    title: "Organisms/Meals Schedule Shopping List App",
    component: App,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        defaultMeals: [
            {
                name: "Ommlettes",
                prepTime: "quick",
                ingredients: [
                    {
                        description: "eggs",
                        qty: 8,
                        unit: ""
                    },
                    {
                        description: "mushrooms",
                        qty: 100,
                        unit: "g"
                    },
                    {
                        description: "cheese",
                        qty: 100,
                        unit: "g"
                    },
                ]
            },
            {
                name: "Meatballs",
                prepTime: "medium",
                ingredients: [
                    {
                        description: "meatballs",
                        qty: 20,
                        unit: ""
                    },
                    {
                        description: "mushrooms",
                        qty: 200,
                        unit: "g"
                    },
                ]
            },
            {
                name: "Roast",
                prepTime: "slow",
                ingredients: [
                    {
                        description: "Potatoes",
                        qty: 8,
                        unit: ""
                    },
                    {
                        description: "Brocolli",
                        qty: 1,
                        unit: ""
                    },
                    {
                        description: "Carrots",
                        qty: 1,
                        unit: ""
                    },
                ]
            }
        ],
    }
}