import { ChangeEvent, FC, useEffect, useState } from "react";
import { TMeal, metricUnits } from "@/types";
import { Accordion, AccordionDetails, AccordionSummary, Button, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { useAuth0 } from "@auth0/auth0-react";
import All_MEALS from "@/queries/meals/allMeals";
import { useQuery } from "@apollo/client";

const Meals: FC = () => {
    const [mealUpdates, setMealUpdates] = useState<TMeal[] | null>(null);
    // const { isAuthenticated, user } = useAuth0();
    const { data, loading, error } = useQuery(All_MEALS);

    useEffect(() => {
        if (data) {
            const copyOfMeals = [...data.meals.data].map((meal, index) => {
                return {
                    ...meal,
                    mealIndex: index,
                }
            })

            setMealUpdates(copyOfMeals);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, loading, error])

    const handleFieldChange = (
        e: SelectChangeEvent<string | null> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
                    attributes: {
                        ...meal.attributes,
                        ingredients: {
                            ...meal.attributes.ingredients.map((ingredient, ii) => {
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
                    }
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
                    attributes: {
                        ...meal.attributes,
                        ingredients: [
                            ...meal.attributes.ingredients,
                            {
                                name: "",
                                quantity: 0,
                                metricUnit: "",
                            }
                        ]
                    }
                }
            } else {
                return meal;
            }
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setMealUpdates(copyOfMeals);
    }

    async function saveMeals() {
        // if (isAuthenticated && user?.email) {
        //     // Do something 
        // }
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
                                    {meal.attributes.name}
                                </AccordionSummary>

                                <AccordionDetails>
                                    {meal.attributes.ingredients.map((ingredient, ii) => {
                                        return (
                                            <div key={meal.mealIndex + ii} className="flex mt-2 gap-[10px]">
                                                <TextField
                                                    type="text"
                                                    value={ingredient.name}
                                                    className="flex-1"
                                                    onChange={(e) => handleFieldChange(e, meal.mealIndex, ii, "name")}
                                                />

                                                <TextField
                                                    type="text"
                                                    value={ingredient.quantity}
                                                    className="w-[60px] text-center"
                                                    onChange={(e) => handleFieldChange(e, meal.mealIndex, ii, "quantity")}
                                                />

                                                <Select
                                                    value={ingredient.metricUnit}
                                                    className="w-[60px] text-center"
                                                    onChange={(e) => handleFieldChange(e, meal.mealIndex, ii, "metricUnit")}
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

                    <Button
                        variant="contained"
                        className="!mt-[10px]"
                        onClick={saveMeals}
                    >Save</Button>
                </div>
            </div>
        </>
    );
}

export default Meals;