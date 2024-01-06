import "./App.css";
import { FC, useEffect, useMemo } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import store from './redux/store.ts';
import Root from './routes/Root/Root.tsx';
import Error from './routes/Error/Error.tsx';
import Meals from './routes/Meals/Meals.tsx';
import ShoppingList from './routes/ShoppingList/ShoppingList.tsx';
import Scheduler from './routes/Scheduler/Scheduler.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const authDomain = import.meta.env.VITE_AUTH_DOMAIN;
const authClientId = import.meta.env.VITE_AUTH_CLIENT_ID;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Meals />,
      },
      {
        path: "/meals",
        element: <Meals />,
      },
      {
        path: "/scheduler",
        element: <Scheduler />,
      },
      {
        path: "/shopping-list",
        element: <ShoppingList />,
      },
    ],
  },
]);

const App: FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  useEffect(() => {
    if (prefersDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, [prefersDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <Auth0Provider
        domain={authDomain}
        clientId={authClientId}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <ReduxProvider store={store}>
          <RouterProvider router={router} />
        </ReduxProvider>
      </Auth0Provider>
    </ThemeProvider>
  );
};

export default App;