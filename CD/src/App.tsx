import "./App.css";
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import Routes from "./routes/Routes.tsx";
import store from './redux/store.ts';
import appolloClient from "./helpers/appolloClient.ts";

const authDomain = import.meta.env.VITE_AUTH_DOMAIN;
const authClientId = import.meta.env.VITE_AUTH_CLIENT_ID;

const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: `'Poppins', sans-serif`,
        },
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  React.useEffect(() => {
    if (prefersDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, [prefersDarkMode])

  return (
    <ApolloProvider client={appolloClient}>
      <ThemeProvider theme={theme}>
        <Auth0Provider
          domain={authDomain}
          clientId={authClientId}
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
        >
          <ReduxProvider store={store}>
            <Routes />
          </ReduxProvider>
        </Auth0Provider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;