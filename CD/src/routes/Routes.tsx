import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from '@/routes/Root/Root.tsx';
import Error from '@/routes/Error/Error.tsx';
import Meals from '@/routes/Meals/Meals.tsx';
import ShoppingList from '@/routes/ShoppingLists/ShoppingLists';
import AddMeal from "@/routes/AddMeal/AddMeal";
import Schedules from "@/routes/Schedules/Schedules";
import Login from "@/routes/Login/Login";
import RequireAuth from "@/components/RequiredAuth/RequiredAuth";
import AddSchedule from "@/routes/AddSchedule/AddSchedule";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <RequireAuth component={<Meals />} />,
            },
            {
                path: "/meals/add",
                element: <RequireAuth component={<AddMeal />} />,
            },
            {
                path: "/meals",
                element: <RequireAuth component={<Meals />} />,
            },
            {
                path: "/schedules/add",
                element: <RequireAuth component={<AddSchedule />} />,
            },
            {
                path: "/schedules",
                element: <RequireAuth component={<Schedules />} />,
            },
            {
                path: "/shopping-lists",
                element: <RequireAuth component={<ShoppingList />} />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
]);

const Routes: React.FC = () => {
    return (
        <RouterProvider router={router} />
    )
};

export default Routes;