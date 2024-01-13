import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from '@/routes/Root/Root.tsx';
import Error from '@/routes/Error/Error.tsx';
import Meals from '@/routes/Meals/Meals.tsx';
import ShoppingList from '@/routes/ShoppingList/ShoppingList.tsx';
import Scheduler from '@/routes/Scheduler/Scheduler.tsx';

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

const Routes: React.FC = () => {
    return (
        <RouterProvider router={router} />
    )
};

export default Routes;