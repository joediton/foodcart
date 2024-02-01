import { FC, useEffect } from "react";

import { useQuery } from "@apollo/client";
import ViewEditMeal from "@/components/ViewEditMeal/VIewEditMeal";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import All_MEALS from "@/graphql/queries/meals/allMeals";
import { TMeal } from "@/types";

type TQueryData = {
    meals: {
        data: TMeal[];
    }
} | null;

const Meals: FC = () => {
    const { data, loading, error } = useQuery<TQueryData>(All_MEALS);
    const meals = data?.meals.data;

    const navigate = useNavigate();

    return (
        <>
            <h1>Meals</h1>

            {loading && (
                <p>Loading...</p>
            )}

            {error && (
                <p>Error: ${error.message}</p>
            )}

            {(meals && meals.length) && (
                <div className="flex flex-col gap-[10px] w-full">
                    {meals.map((meal, index) => (
                        <ViewEditMeal {...meal} key={"meal" + index} />
                    ))}
                </div>
            )}

            {data && (
                <Button
                    type="button"
                    variant="outlined"
                    onClick={() => navigate('/meals/add')}
                >Add Meal</Button>
            )}
        </>
    );
}

export default Meals;