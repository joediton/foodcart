import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from '@/routes/Root/Root.tsx';
import Error from '@/routes/Error/Error.tsx';
import Meals from '@/routes/Meals/Meals.tsx';
import ShoppingList from '@/routes/ShoppingList/ShoppingList.tsx';
import AddMeal from "./AddMeal/AddMeal";
import Schedules from "@/routes/Schedules/Schedules";
import GenerateSchedule from "./GenerateSchedule/GenerateSchedule";

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
                path: "/meals/add",
                element: <AddMeal />,
            },
            {
                path: "/meals",
                element: <Meals />,
            },
            {
                path: "/schedules/generate",
                element: <GenerateSchedule />,
            },
            {
                path: "/schedules",
                element: <Schedules />,
            },
            {
                path: "/shopping-list",
                element: <ShoppingList />,
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