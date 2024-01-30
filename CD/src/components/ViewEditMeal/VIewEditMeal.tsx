import { TIngredient, TMeal, timingCategories } from "@/types";
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

export type TViewEditMealProps = TMeal;

const ViewEditMeal: React.FC<TViewEditMealProps> = (props) => {
    const [editMode, setEditMode] = React.useState<boolean>(props.editMode);
    const [name, setName] = React.useState<string>(props.attributes.name);
    const [timingCategory, setTimingCategory] = React.useState<string>(props.attributes.timingCategory);
    const [ingredients, setIngredients] = React.useState<TIngredient[]>(props.attributes.ingredients);
    const [updateMeal] = useMutation(UPDATE_MEAL, {
        variables: {
            id: props.id,
            name,
            timingCategory,
            ingredients,
        },
    });

    const handleEditButtonClick = (): void => {
        setEditMode(true);
    }

    const handleAddIngredientButtonClick = (): void => {
        const newIngredient: TIngredient = {
            name: "",
            quantity: 0,
            metricUnit: "",
        }
        setIngredients([...ingredients, newIngredient]);
    }

    const handleIngredientChange = (ingredient: TIngredient, index: number): void => {
        const copyOfIngredients = [...ingredients];
        copyOfIngredients[index] = ingredient;
        setIngredients(copyOfIngredients);
    }

    const handleRemoveIngredientButtonClick = (index: number): void => {
        const confirmed = window.confirm("Are you sure you want to delete this ingredient?");
        if (!confirmed) return;

        const copyOfIngredients = [...ingredients.slice(index, 1)];
        console.log(copyOfIngredients);
        // setIngredients(copyOfIngredients);
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
                    <>
                        <div className="flex items-center gap-[30px]">
                            <h3 className="h4 my-0">Timing Category:</h3>
                            <p className="h4 my-0 font-normal">{timingCategory}</p>
                        </div>

                        {ingredients.length > 0 && (
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

                        <div className="mt-[30px] flex gap-[20px] justify-between">
                            <Button
                                variant="outlined"
                                onClick={handleEditButtonClick}
                            >Edit</Button>
                        </div>
                    </>
                )}

                {editMode && (
                    <form onSubmit={handleFormSubmit}>
                        <TextField
                            label="Name"
                            type="text"
                            value={name}
                            className="w-full"
                            onChange={(e) => setName(e.target.value)}
                            required={true}
                        />

                        <div className="mt-[30px]">
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
                                                    />
                                                }
                                                label={category}
                                            />
                                        </span>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </div>

                        {ingredients.length > 0 && (
                            <>
                                <h3>Ingredients</h3>

                                <div className="flex flex-col gap-[30px]">
                                    {ingredients.map((ingredient, ii) => {
                                        return (
                                            <div key={props.id + ii}>
                                                <EditIngredient
                                                    handleIngredientChange={handleIngredientChange}
                                                    handleDeleteIngredient={handleRemoveIngredientButtonClick}
                                                    index={ii}
                                                    ingredient={ingredient}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        )}

                        <div className="mt-[30px] flex gap-[20px] justify-between">
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={handleAddIngredientButtonClick}
                            >Add Ingredient</Button>
                        </div>

                        <div className="mt-[30px] flex gap-[20px] justify-between">
                            <Button
                                type="button"
                                variant="outlined"
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