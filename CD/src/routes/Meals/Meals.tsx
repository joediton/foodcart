import { ChangeEvent, FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TMeal, metricUnits } from "@/types";
import { updateAllMeals } from "@/redux/slices/meals.slice";
import { Accordion, AccordionDetails, AccordionSummary, Button, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import squidexClient from "@/helpers/squidexClient";
import { useAuth0 } from "@auth0/auth0-react";

const Meals: FC = () => {
    const meals = useAppSelector(state => state.meals.value);
    const [mealUpdates, setMealUpdates] = useState<TMeal[] | null>(null);
    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAuth0();

    useEffect(() => {
        if (meals) {
            const copyOfMeals = [...meals].map((meal, index) => {
                return {
                    ...meal,
                    mealIndex: index,
                }
            })

            setMealUpdates(copyOfMeals);
        } else {
            getMeals();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meals])

    async function getMeals() {
        const response = await squidexClient.contents.getContents("meal");
        dispatch(updateAllMeals([...response.items as unknown as TMeal[]]));
    }

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
                    data: {
                        ...meal.data,
                        ingredients: {
                            ...meal.data.ingredients,
                            iv: meal.data.ingredients.iv.map((ingredient, ii) => {
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
                    data: {
                        ...meal.data,
                        ingredients: {
                            ...meal.data.ingredients,
                            iv: [
                                ...meal.data.ingredients.iv,
                                {
                                    name: "",
                                    quantity: 0,
                                    metricUnit: "",
                                }
                            ]
                        }
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
        if (isAuthenticated && user?.email) {
            const getResponse = await squidexClient.contents.getContents(
                "user",
                {
                    filter: `data/email/iv eq '${user?.email}'`
                }
            );
            console.log(getResponse);

            // if (getResponse.items.length === 1) {
            //     const id = getResponse.items[0].id;

            //     const putResponse = await squidexClient.contents.putContent("user", id, {
            //         email: { iv: user?.email },
            //         meals: mealUpdates
            //     });

            //     console.log(putResponse);
            // }
        }
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
                                    {meal.data.name.iv}
                                </AccordionSummary>

                                <AccordionDetails>
                                    {meal.data.ingredients.iv.map((ingredient, ii) => {
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