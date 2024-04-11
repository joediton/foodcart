import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from '@/routes/Root/Root.tsx';
import Error from '@/routes/Error/Error.tsx';
import Meals from '@/routes/Meals/Meals.tsx';
import ShoppingList from '@/routes/ShoppingLists/ShoppingLists';
import CreateMeal from "@/routes/CreateMeal/CreateMeal";
import Schedules from "@/routes/Schedules/Schedules";
import Login from "@/routes/Login/Login";
import RequireAuth from "@/components/RequiredAuth/RequiredAuth";
import CreateSchedule from "@/routes/CreateSchedule/CreateSchedule";
import CreateShoppingList from "./CreateShoppingList/CreateShoppingList";
import MealDetail from "./MealDetail/MealDetail";

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
                path: "/meal/:mealSlug",
                element: <RequireAuth component={<MealDetail />} />,
            },
            {
                path: "/meals/create",
                element: <RequireAuth component={<CreateMeal />} />,
            },
            {
                path: "/meals",
                element: <RequireAuth component={<Meals />} />,
            },
            {
                path: "/schedules/create",
                element: <RequireAuth component={<CreateSchedule />} />,
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
                path: "/shopping-lists/create",
                element: <RequireAuth component={<CreateShoppingList />} />,
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