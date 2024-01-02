import "./App.css";
import { FC, useEffect, useMemo } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
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
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </ThemeProvider>
  );
};

export default App;