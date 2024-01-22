import { TIngredient, TMeal, timingCategories } from "@/types";
import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIngredient from "../EditIngredient/EditIngredient";
// import { useMutation } from "@apollo/client";
// import UPDATE_MEAL from "@/graphql/mutations/updateMeal";

export type TViewEditMealProps = TMeal;

const ViewEditMeal: React.FC<TViewEditMealProps> = (props) => {
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [name] = React.useState<string>(props.attributes.name);
    const [timingCategory, setTimingCategory] = React.useState<string>(props.attributes.timingCategory);
    const [ingredients, setIngredients] = React.useState<TIngredient[]>(props.attributes.ingredients);
    // const [updateMeal] = useMutation(UPDATE_MEAL, {
    //     variables: {
    //         id: props.id,
    //         name,
    //         timingCategory,
    //         ingredients,
    //     },
    // });

    const handleEditButtonClick = (): void => {
        setEditMode(true);
    }

    const handleSaveButtonClick = (): void => {
        // updateMeal();
        setEditMode(false);
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

    return (
        <Accordion key={props.id}>
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
                    </>
                )}

                {editMode && (
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

                        {ingredients.length > 0 && (
                            <>
                                <h3>Ingredients</h3>

                                {ingredients.map((ingredient, ii) => {
                                    return (
                                        <div key={props.id + ii} className="flex mt-2 gap-[10px]">
                                            <EditIngredient
                                                handleIngredientChange={handleIngredientChange}
                                                index={ii}
                                                ingredient={ingredient}
                                            />
                                        </div>
                                    )
                                })}
                            </>
                        )}
                    </>
                )}

                <div className="mt-[30px]">
                    {editMode && (
                        <div className="flex gap-[20px] justify-between">
                            <Button
                                variant="outlined"
                                onClick={handleAddIngredientButtonClick}
                            >Add Ingredient</Button>

                            <Button
                                variant="outlined"
                                onClick={handleSaveButtonClick}
                            >Save</Button>
                        </div>
                    )}

                    {!editMode && (
                        <Button
                            variant="outlined"
                            onClick={handleEditButtonClick}
                        >Edit</Button>
                    )}
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default ViewEditMeal;