import { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/global.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
  ],
};

export const parameters = {
  msw: {
    handlers: {
      auth: [
        rest.get("/login", (req, res, ctx) => {
          return res(
            ctx.json({
              success: true,
            })
          );
        }),
        rest.get("/logout", (req, res, ctx) => {
          return res(
            ctx.json({
              success: true,
            })
          );
        }),
      ],
    },
  },
};

export default preview;
