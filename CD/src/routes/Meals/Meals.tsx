import { FC, useEffect, useState } from "react";

// import { useAuth0 } from "@auth0/auth0-react";
import { TMeal } from "@/types";
import All_MEALS from "@/queries/meals/allMeals";
import { useQuery } from "@apollo/client";
import ViewEditMeal from "@/components/ViewEditMeal/VIewEditMeal";

const Meals: FC = () => {
    const [mealUpdates, setMealUpdates] = useState<TMeal[] | null>(null);
    // const { isAuthenticated, user } = useAuth0();
    const { data, loading, error } = useQuery(All_MEALS);

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
            <h1 className="mt-0">Meals</h1>

            <div>
                <div className="flex flex-col gap-[10px]">
                    {(mealUpdates && mealUpdates.length > 0) &&
                        mealUpdates.map((meal, index) => (
                            <ViewEditMeal key={"meal" + index} {...meal} />
                        ))}
                </div>
            </div>
        </>
    );
}

export default Meals;