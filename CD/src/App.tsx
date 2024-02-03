import "./App.css";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import Routes from "./routes/Routes.tsx";
import appolloClient from "./helpers/appolloClient.ts";
import { AuthProvider } from "./hooks/useAuth.tsx";

const App: React.FC = () => {
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

  return (
    <ApolloProvider client={appolloClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;