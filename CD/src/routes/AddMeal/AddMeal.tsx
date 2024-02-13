import { FC, FormEvent, useState } from "react";

import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { TIngredient, TMealsQueryResponse, timingCategories } from "@/types";
import EditIngredient from "@/components/EditIngredient/EditIngredient";
import { useMutation } from "@apollo/client";
import CREATE_MEAL from "@/graphql/mutations/createMeal";
import All_MEALS from "@/graphql/queries/meals/allMeals";
import RootHeader from "@/components/RootHeader/RootHeader";
import useAuth from "@/hooks/useAuth";

const AddMeal: FC = () => {
    const { userId } = useAuth();
    const [name, setName] = useState("");
    const [timingCategory, setTimingCategory] = useState("");
    const [ingredients, setIngredients] = useState<TIngredient[]>([]);
    const [createMeal] = useMutation(CREATE_MEAL, {
        variables: {
            name,
            timingCategory,
            ingredients,
            userId,
        },
        update(cache, { data }) {
            const newMeal = data?.createMeal.data;
            const existingMeals: TMealsQueryResponse = cache.readQuery({ query: All_MEALS, variables: { userId } });
            if (!newMeal || !existingMeals) return;

            cache.writeQuery({
                query: All_MEALS,
                variables: { userId },
                data: {
                    meals: {
                        data: [...existingMeals.meals.data, newMeal],
                    }
                }
            });
        }
    });

    const navigate = useNavigate();

    const handleAddIngredientButtonClick = (): void => {
        setIngredients([...ingredients, {
            name: "",
            quantity: 0,
            metricUnit: "",
        }]);
    }

    const handleIngredientFieldChange = (targetIndex: number, key: string, value: string): void => {
        setIngredients([...ingredients].map((ingredient, index) => {
            if (targetIndex === index) {
                return {
                    ...ingredient,
                    [key]: key === "quantity" ? parseInt(value) : value,
                }
            }
            return ingredient;
        }));
    }

    const handleDeleteIngredientButtonClick = (index: number): void => {
        const confirmed = window.confirm("Are you sure you want to delete this ingredient?");
        if (!confirmed) return;

        const copyOfIngredients = [...ingredients];
        copyOfIngredients.splice(index, 1);
        setIngredients(copyOfIngredients);
    }

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        createMeal();
        navigate('/meals');
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <RootHeader>
                <h1>Add Meal</h1>

                <Button
                    type="submit"
                    variant="outlined"
                >Save</Button>
            </RootHeader>

            <div className="flex flex-col gap-[30px] w-full">
                <TextField
                    label="Name"
                    type="text"
                    value={name}
                    className="w-full"
                    onChange={(e) => setName(e.target.value)}
                    required={true}
                />

                <FormControl required={true}>
                    <FormLabel
                        id="timing-category"
                    >Timing Category</FormLabel>

                    <RadioGroup
                        row
                        aria-labelledby="timing-category"
                    >
                        {timingCategories.map((category, index) => (
                            <span key={index}>
                                <FormControlLabel
                                    value={category}
                                    control={
                                        <Radio
                                            checked={timingCategory === category}
                                            onChange={(e) => setTimingCategory(e.target.value)}
                                            required={true}
                                        />
                                    }
                                    label={category}
                                />
                            </span>
                        ))}
                    </RadioGroup>
                </FormControl>

                {ingredients.length > 0 && (
                    <div className="flex flex-col gap-[30px]">
                        <h3>Ingredients</h3>

                        {ingredients.map((ingredient, ii) => {
                            return (
                                <div key={"ingredient" + ii} className="flex gap-[10px]">
                                    <EditIngredient
                                        handleDeleteIngredientButtonClick={handleDeleteIngredientButtonClick}
                                        handleIngredientFieldChange={handleIngredientFieldChange}
                                        index={ii}
                                        ingredient={ingredient}
                                    />
                                </div>
                            )
                        })}
                    </div>
                )}

                <Button
                    type="button"
                    variant="outlined"
                    onClick={handleAddIngredientButtonClick}
                >Add Ingredient</Button>
            </div>
        </form>
    );
}

export default AddMeal;