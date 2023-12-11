import { rest } from "msw";

const allMeals = [
  {
    name: "Ommlettes",
    prepTime: "quick",
    ingredients: [
      {
        description: "eggs",
        qty: 8,
        unit: "",
      },
      {
        description: "mushrooms",
        qty: 100,
        unit: "g",
      },
      {
        description: "cheese",
        qty: 100,
        unit: "g",
      },
    ],
  },
  {
    name: "Meatballs",
    prepTime: "medium",
    ingredients: [
      {
        description: "meatballs",
        qty: 20,
        unit: "",
      },
      {
        description: "mushrooms",
        qty: 200,
        unit: "g",
      },
    ],
  },
  {
    name: "Roast",
    prepTime: "slow",
    ingredients: [
      {
        description: "Potatoes",
        qty: 8,
        unit: "",
      },
      {
        description: "Brocolli",
        qty: 1,
        unit: "",
      },
      {
        description: "Carrots",
        qty: 1,
        unit: "",
      },
    ],
  },
];

export const getUserMeals = rest.get("/meals", (req, res, ctx) => {
  return res(ctx.json([...allMeals]));
});
