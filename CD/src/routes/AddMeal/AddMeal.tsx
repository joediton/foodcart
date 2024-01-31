import { FC, FormEvent, useState } from "react";

import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { TIngredient, timingCategories } from "@/types";
import EditIngredient from "@/components/EditIngredient/EditIngredient";
import { useMutation } from "@apollo/client";
import CREATE_MEAL from "@/graphql/mutations/createMeal";

const AddMeal: FC = () => {
    const [name, setName] = useState<string>("");
    const [timingCategory, setTimingCategory] = useState<string>("");
    const [ingredients, setIngredients] = useState<TIngredient[]>([]);
    const [createMeal] = useMutation(CREATE_MEAL, {
        variables: {
            name,
            timingCategory,
            ingredients,
        },
    });

    const navigate = useNavigate();

    const handleIngredientChange = (ingredient: TIngredient, index: number): void => {
        const copyOfIngredients = [...ingredients];
        copyOfIngredients[index] = ingredient;
        setIngredients(copyOfIngredients);
    }

    const handleAddIngredientButtonClick = (): void => {
        const newIngredient: TIngredient = {
            name: "",
            quantity: 0,
            metricUnit: "",
        }
        setIngredients([...ingredients, newIngredient]);
    }

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        createMeal();
        navigate('/meals');
    }

    return (
        <>
            <h1>Add Meal</h1>

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
                                                required={true}
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

                        {ingredients.map((ingredient, ii) => {
                            return (
                                <div key={"ingredient" + ii} className="flex mt-2 gap-[10px]">
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

                <div className="mt-[30px]">
                    <div className="flex gap-[20px] justify-between">
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={handleAddIngredientButtonClick}
                        >Add Ingredient</Button>

                        <Button
                            type="submit"
                            variant="outlined"
                        >Save</Button>
                    </div>
                </div>
            </form>

        </>
    );
}

export default AddMeal;