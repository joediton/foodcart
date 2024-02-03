import React, { Suspense } from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const Root = React.lazy(() => import('@/routes/Root/Root.tsx'));
const Error = React.lazy(() => import('@/routes/Error/Error.tsx'));
const Meals = React.lazy(() => import('@/routes/Meals/Meals.tsx'));
const ShoppingList = React.lazy(() => import('@/routes/ShoppingList/ShoppingList.tsx'));
const AddMeal = React.lazy(() => import('@/routes/AddMeal/AddMeal'));
const Schedules = React.lazy(() => import('@/routes/Schedules/Schedules'));
const GenerateSchedule = React.lazy(() => import('@/routes/GenerateSchedule/GenerateSchedule'));

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
        <Suspense fallback={<p>Loading</p>}>
            <RouterProvider router={router} />
        </Suspense>
    )
};

export default Routes;