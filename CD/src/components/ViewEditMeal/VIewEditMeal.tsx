import { TMeal, timingCategories } from "@/types";
import React, { FormEvent } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIngredient from "../EditIngredient/EditIngredient";
import { useMutation } from "@apollo/client";
import UPDATE_MEAL from "@/graphql/mutations/updateMeal";
import DELETE_MEAL from "@/graphql/mutations/deleteMeal";
import All_MEALS from "@/graphql/queries/meals/allMeals";

export type TViewEditMealProps = TMeal;

const ViewEditMeal: React.FC<TViewEditMealProps> = (props) => {
    const [editMode, setEditMode] = React.useState(props.editMode);
    const [name, setName] = React.useState(props.attributes.name);
    const [timingCategory, setTimingCategory] = React.useState(props.attributes.timingCategory);
    const [ingredients, setIngredients] = React.useState(props.attributes.ingredients);
    const [updateMeal] = useMutation(UPDATE_MEAL, {
        variables: {
            id: props.id,
            name,
            timingCategory,
            ingredients,
        },
        update(cache, { data }) {
            const updatedMeal = data?.updateMeal.data;
            const existingMeals = cache.readQuery({ query: All_MEALS });

            cache.writeQuery({
                query: All_MEALS,
                data: {
                    meals: {
                        data: existingMeals.meals.data.map((meal: TMeal) => {
                            if (meal.id === updatedMeal.id) {
                                return updatedMeal;
                            }
                            return meal;
                        }),
                    }
                }
            });
        }
    });
    const [deleteMeal] = useMutation(DELETE_MEAL, {
        variables: {
            id: props.id,
        },
        update(cache, { data }) {
            const deletedMeal = data?.deleteMeal.data;
            const existingMeals = cache.readQuery({ query: All_MEALS });

            cache.writeQuery({
                query: All_MEALS,
                data: {
                    meals: {
                        data: existingMeals.meals.data.filter((meal: TMeal) => meal.id !== deletedMeal.id),
                    }
                }
            });
        }
    });

    const handleEditButtonClick = (): void => {
        setEditMode(true);
    }

    const handleDeleteMealButtonClick = (): void => {
        const confirmed = window.confirm("Are you sure you want to delete this meal?");
        if (!confirmed) return;

        setEditMode(false);
        deleteMeal();
    }

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
        updateMeal();
        setEditMode(false);
    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <h2 className="my-0">{name}</h2>
            </AccordionSummary>

            <AccordionDetails>
                {!editMode && (
                    <div className="flex flex-col gap-[30px] items-start">
                        <div className="flex items-center gap-[30px] w-full">
                            <h3 className="h4">Timing Category:</h3>
                            <p className="h4 font-normal">{timingCategory}</p>
                        </div>

                        {ingredients.length > 0 && (
                            <>
                                <h3>Ingredients</h3>

                                <table className="w-full -mt-[15px]">
                                    <thead>
                                        <tr>
                                            <th className="text-left">Name</th>
                                            <th className="w-[60px] text-center">QTY</th>
                                            <th className="w-[60px] text-center">Unit</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {ingredients.map((ingredient, ii) => {
                                            return (
                                                <tr key={props.id + ii}>
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

                        <Button
                            variant="outlined"
                            onClick={handleEditButtonClick}
                        >Edit</Button>
                    </div>
                )}

                {editMode && (
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-[30px]">
                        <TextField
                            size="small"
                            label="Name"
                            type="text"
                            value={name}
                            className="w-full"
                            onChange={(e) => setName(e.target.value)}
                            required={true}
                        />

                        <FormControl size="small">
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
                            <>
                                <h3>Ingredients</h3>

                                <div className="flex flex-col gap-[30px]">
                                    {ingredients.map((ingredient, ii) => {
                                        return (
                                            <div key={props.id + ii}>
                                                <EditIngredient
                                                    handleIngredientFieldChange={handleIngredientFieldChange}
                                                    handleDeleteIngredientButtonClick={handleDeleteIngredientButtonClick}
                                                    index={ii}
                                                    ingredient={ingredient}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        )}

                        <Button
                            type="button"
                            variant="outlined"
                            onClick={handleAddIngredientButtonClick}
                        >Add Ingredient</Button>

                        <div className="flex gap-[20px] justify-between">
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={handleDeleteMealButtonClick}
                            >Delete Meal</Button>

                            <Button
                                type="submit"
                                variant="outlined"
                            >Save Meal</Button>
                        </div>
                    </form>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

export default ViewEditMeal;