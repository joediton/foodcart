import { FC } from "react";
import { useQuery } from "@apollo/client";
import ViewEditMeal from "@/components/ViewEditMeal/VIewEditMeal";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import All_MEALS from "@/graphql/queries/allMeals";
import { TMealsQueryResponse } from "@/types";
import RootHeader from "@/components/RootHeader/RootHeader";
import useAuth from "@/hooks/useAuth";

const Meals: FC = () => {
    const { userId } = useAuth();
    const { data, loading, error } = useQuery<TMealsQueryResponse>(All_MEALS,
        { variables: { userId } }
    );
    const meals = data?.meals.data;

    const navigate = useNavigate();

    return (
        <>
            <RootHeader>
                <h1>Meals</h1>

                {data && (
                    <Button
                        type="button"
                        variant="outlined"
                        onClick={() => navigate('/meals/create')}
                    >Create</Button>
                )}
            </RootHeader>

            <div className="flex flex-col gap-[30px] items-start ">
                {loading && (
                    <p>Loading...</p>
                )}

                {error && (
                    <p>Error: ${error.message}</p>
                )}

                {(meals && meals.length > 0) && (
                    <div className="flex flex-col gap-[10px] w-full">
                        {meals.map((meal) => (
                            <ViewEditMeal {...meal} key={meal.id} />
                        ))}
                    </div>
                )}

                {(!error && (!meals || meals.length === 0)) && (
                    <p className="text-center my-10">No meals found</p>
                )}
            </div>
        </>
    );
}

export default Meals;