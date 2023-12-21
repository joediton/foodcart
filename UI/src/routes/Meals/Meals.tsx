import { ChangeEvent, FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TMeal, metricUnits } from "@/types";
import { updateAllMeals } from "@/redux/slices/meals.slice";
import { Accordion, AccordionDetails, AccordionSummary, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import squidexClient from "@/helpers/squidexClient";

const Meals: FC = () => {
    const meals = useAppSelector(state => state.meals.value);
    const [mealUpdates, setMealUpdates] = useState<TMeal[] | null>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!meals) {
            getMeals();
        }
    }, [meals])

    async function getMeals() {
        const response = await squidexClient.contents.getContents("meal");
        console.log(response);
        dispatch(updateAllMeals(meals));
    }

    useEffect(() => {
        if (meals) {
            const copyOfMeals = [...meals].map((meal, index) => {
                return {
                    ...meal,
                    mealIndex: index,
                }
            })

            setMealUpdates(copyOfMeals);
        }
    }, [meals])

    const handleFieldChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        mealIndex: number,
        ingredientIndex: number,
        property: string
    ): void => {
        if (!mealUpdates) return;

        const value = e.target.value;

        const copyOfMeals = [...mealUpdates].map((meal) => {
            if (meal.mealIndex === mealIndex) {
                return {
                    ...meal,
                    ingredients: meal.ingredients.map((ingredient, ii) => {
                        if (ii === ingredientIndex) {
                            return {
                                ...ingredient,
                                [property]: value,
                            }
                        } else {
                            return ingredient
                        }
                    })
                }
            } else {
                return meal;
            }
        });

        setMealUpdates(copyOfMeals);
    }

    const handleAddIngredientButtonClick = (
        mealIndex: number,
    ): void => {
        if (!mealUpdates) return;

        const copyOfMeals = [...mealUpdates].map((meal) => {
            if (meal.mealIndex === mealIndex) {
                return {
                    ...meal,
                    ingredients: [
                        ...meal.ingredients,
                        {
                            description: "",
                            qty: 0,
                            unit: "",
                        }
                    ]
                }
            } else {
                return meal;
            }
        });

        setMealUpdates(copyOfMeals);
    }

    return (
        <>
            <h2 className="screen-header">Meals</h2>

            <div className="screen-body">
                <div className="flex flex-col gap-[10px]">
                    {(mealUpdates && mealUpdates.length > 0) &&
                        mealUpdates.map((meal) => (
                            <Accordion key={meal.mealIndex}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    {meal.name}
                                </AccordionSummary>
                                <AccordionDetails>

                                    {meal.ingredients.map((ingredient, ii) => {
                                        return (
                                            <div key={meal.mealIndex + ii} className="flex mt-2 gap-[10px]">
                                                <TextField
                                                    type="text"
                                                    value={ingredient.description}
                                                    className="flex-1"
                                                    onChange={(e) => handleFieldChange(e, meal.mealIndex, ii, "description")}
                                                />

                                                <TextField
                                                    type="text"
                                                    value={ingredient.qty}
                                                    className="w-[60px] text-center"
                                                    onChange={(e) => handleFieldChange(e, meal.mealIndex, ii, "qty")}
                                                />

                                                <Select
                                                    value={ingredient.unit}
                                                    className="w-[60px] text-center"
                                                    onChange={(e) => handleFieldChange(e, meal.mealIndex, ii, "unit")}
                                                >
                                                    {metricUnits.map((unit, index) => (
                                                        <MenuItem value={unit} key={index}>{unit}</MenuItem>
                                                    ))}
                                                </Select>
                                            </div>
                                        )
                                    })}

                                    <Button
                                        variant="outlined"
                                        onClick={() => handleAddIngredientButtonClick(meal.mealIndex)}
                                        className="!mt-[10px]"
                                    >Add Ingredient</Button>
                                </AccordionDetails>
                            </Accordion>
                        ))}

                    <Button variant="contained" className="!mt-[10px]">Save</Button>
                </div>
            </div>
        </>
    );
}

export default Meals;