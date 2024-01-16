import { ChangeEvent, FC, useEffect, useState } from "react";
import { TMeal, metricUnits, timingCategories } from "@/types";
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from "@mui/material";
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
                    editMode: false,
                }
            })

            setMealUpdates(copyOfMeals);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, loading, error])

    const handleIngredientFieldChange = (args: {
        e: SelectChangeEvent<string | null> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        mealIndex: number,
        ingredientIndex: number,
        property: string,
    }): void => {
        if (!mealUpdates) return;

        const value = args.e.target.value;
        const copyOfMeals = [...mealUpdates].map((meal) => meal.mealIndex === args.mealIndex ? {
            ...meal,
            attributes: {
                ...meal.attributes,
                ingredients: [
                    ...meal.attributes.ingredients.map((ingredient, ii) => {
                        if (ii === args.ingredientIndex) {
                            return {
                                ...ingredient,
                                [args.property]: value,
                            }
                        } else {
                            return ingredient
                        }
                    })
                ]
            }
        } : meal);

        setMealUpdates(copyOfMeals);
    }

    const handleAddIngredientButtonClick = (
        mealIndex: number,
    ): void => {
        if (!mealUpdates) return;

        const copyOfMeals = [...mealUpdates].map((meal) => meal.mealIndex === mealIndex ? {
            ...meal,
            attributes: {
                ...meal.attributes,
                ingredients: [
                    ...meal.attributes.ingredients,
                    {
                        name: "",
                        quantity: "",
                        metricUnit: "",
                    }
                ]
            }
        } : meal);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setMealUpdates(copyOfMeals);
    }

    const handleEditButtonClick = (mealIndex: number): void => {
        if (mealUpdates) {
            const copyOfMeals = [...mealUpdates];
            copyOfMeals[mealIndex].editMode = !copyOfMeals[mealIndex].editMode;
            setMealUpdates(copyOfMeals);
        }
    }

    const handleSaveMealButtonClick = (mealIndex: number): void => {
        if (mealUpdates) {
            const copyOfMeals = [...mealUpdates];
            copyOfMeals[mealIndex].editMode = !copyOfMeals[mealIndex].editMode;
            setMealUpdates(copyOfMeals);
        }
    }

    return (
        <>
            <h1 className="mt-0">Meals</h1>

            <div>
                <div className="flex flex-col gap-[10px]">
                    {(mealUpdates && mealUpdates.length > 0) &&
                        mealUpdates.map((meal) => (
                            <Accordion key={meal.mealIndex}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <h2 className="my-0">{meal.attributes.name}</h2>
                                </AccordionSummary>

                                <AccordionDetails>
                                    {!meal.editMode && (
                                        <>
                                            <div className="flex items-center gap-[30px]">
                                                <h3 className="h4 my-0">Timing Category:</h3>
                                                <p className="h4 my-0 font-normal">{meal.attributes.timingCategory}</p>
                                            </div>

                                            {meal.attributes.ingredients.length > 0 && (
                                                <>
                                                    <h3>Ingredients</h3>

                                                    <table className="w-full">
                                                        <thead>
                                                            <tr>
                                                                <th className="text-left">Name</th>
                                                                <th className="w-[60px] text-center">QTY</th>
                                                                <th className="w-[60px] text-center">Unit</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {meal.attributes.ingredients.map((ingredient, ii) => {
                                                                return (
                                                                    <tr key={meal.mealIndex + ii}>
                                                                        <td className="text-left">{ingredient.name}</td>
                                                                        <td className="w-[60px] text-center">{ingredient.quantity}</td>
                                                                        <td className="w-[60px] text-center">{ingredient.metricUnit}</td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </>
                                            )}
                                        </>
                                    )}

                                    {meal.editMode && (
                                        <>
                                            <FormControl>
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
                                                                    <Radio checked={meal.attributes.timingCategory === category} />
                                                                }
                                                                label={category}
                                                            />
                                                        </span>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>

                                            {meal.attributes.ingredients.length > 0 && (
                                                <>
                                                    <h3>Ingredients</h3>

                                                    {meal.attributes.ingredients.map((ingredient, ii) => {
                                                        return (
                                                            <div key={meal.mealIndex + ii} className="flex mt-2 gap-[10px]">
                                                                <TextField
                                                                    type="text"
                                                                    value={ingredient.name}
                                                                    className="flex-1"
                                                                    onChange={(e) => handleIngredientFieldChange({
                                                                        e,
                                                                        mealIndex: meal.mealIndex,
                                                                        ingredientIndex: ii,
                                                                        property: "name",
                                                                    })}
                                                                />

                                                                <TextField
                                                                    type="text"
                                                                    value={ingredient.quantity}
                                                                    className="w-[60px] text-center"
                                                                    onChange={(e) => handleIngredientFieldChange({
                                                                        e,
                                                                        mealIndex: meal.mealIndex,
                                                                        ingredientIndex: ii,
                                                                        property: "quantity",
                                                                    })}
                                                                />

                                                                <Select
                                                                    value={ingredient.metricUnit}
                                                                    className="w-[60px] text-center"
                                                                    onChange={(e) => handleIngredientFieldChange({
                                                                        e,
                                                                        mealIndex: meal.mealIndex,
                                                                        ingredientIndex: ii,
                                                                        property: "metricUnit",
                                                                    })}
                                                                >
                                                                    {metricUnits.map((unit, index) => (
                                                                        <MenuItem value={unit} key={index}>{unit}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </div>
                                                        )
                                                    })}
                                                </>
                                            )}
                                        </>
                                    )}

                                    <div className="mt-[30px]">
                                        {meal.editMode && (
                                            <div className="flex gap-[20px] justify-between">
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => handleAddIngredientButtonClick(meal.mealIndex)}
                                                >Add Ingredient</Button>

                                                <Button
                                                    variant="outlined"
                                                    onClick={() => handleSaveMealButtonClick(meal.mealIndex)}
                                                >Save</Button>
                                            </div>
                                        )}

                                        {!meal.editMode && (
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleEditButtonClick(meal.mealIndex)}
                                            >Edit</Button>
                                        )}
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                </div>
            </div>
        </>
    );
}

export default Meals;