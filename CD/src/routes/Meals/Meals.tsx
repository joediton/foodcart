import { FC, useEffect, useState } from "react";

import { TMeal } from "@/types";
import All_MEALS from "@/queries/meals/allMeals";
import { useQuery } from "@apollo/client";
import ViewEditMeal from "@/components/ViewEditMeal/VIewEditMeal";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const Meals: FC = () => {
    const [mealUpdates, setMealUpdates] = useState<TMeal[] | null>(null);
    const { data, loading, error } = useQuery(All_MEALS);

    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            const copyOfMeals = [...data.meals.data].map((meal) => {
                return {
                    ...meal,
                    editMode: false,
                }
            })

            setMealUpdates(copyOfMeals);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, loading, error])

    return (
        <>
            <h1>Meals</h1>

            <div>
                <div className="flex flex-col gap-[10px]">
                    {(mealUpdates && mealUpdates.length > 0) &&
                        mealUpdates.map((meal, index) => (
                            <ViewEditMeal key={"meal" + index} {...meal} />
                        ))}
                </div>
            </div>

            <div className="mt-[20px]">
                <Button
                    type="button"
                    variant="outlined"
                    onClick={() => navigate('/meals/add')}
                >Add Meal</Button>
            </div>
        </>
    );
}

export default Meals;