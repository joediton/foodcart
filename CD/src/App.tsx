import "./App.css";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import Routes from "./routes/Routes.tsx";
import appolloClient from "./helpers/appolloClient.ts";

const App: React.FC = () => {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: `'Poppins', sans-serif`,
        },
        palette: {
          mode: 'dark',
        },
      }),
    [],
  );

  // React.useEffect(() => {
  //   if (prefersDarkMode) {
  //     document.documentElement.setAttribute("data-theme", "dark");
  //   }
  // }, [prefersDarkMode])

  return (
    <ApolloProvider client={appolloClient}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;