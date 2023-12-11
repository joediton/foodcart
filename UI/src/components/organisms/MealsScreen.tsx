import Button from "@/components/atoms/button/Button";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { TMeal, TPrepTimingOptions, metricUnits, prepTimingOptions } from "@/types";
import Dropdown from "@/components/molecules/Dropdown/Dropdown";

const MealsScreen: FC = () => {
    const meals = useAppSelector(state => state.meals.value);
    const [mealUpdates, setMealUpdates] = useState<TMeal[] | null>(null);

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

    const renderMealsByPrepTime = (meals: TMeal[], prepTime: TPrepTimingOptions) => {
        if (!mealUpdates || mealUpdates.length === 0) return null;

        return (
            <Dropdown toggler={<h3 className="p-4 text-left">{prepTime}</h3>}>
                <div className="flex flex-col px-4 pb-4">
                    {meals.map((meal) => {
                        if (meal && meal.prepTime == prepTime) {
                            return (
                                <div key={meal.mealIndex}>
                                    <h4>{meal.name}</h4>

                                    {meal.ingredients.map((ingredient, ii) => {
                                        return (
                                            <div key={meal.mealIndex + ii} className="flex mt-2 gap-[10px]">
                                                <input
                                                    type="text"
                                                    value={ingredient.description}
                                                    className="flex-1"
                                                    onChange={(e) => handleFieldChange(e, meal.mealIndex, ii, "description")}
                                                />

                                                <input
                                                    type="text"
                                                    value={ingredient.qty}
                                                    className="w-[60px] text-center"
                                                    onChange={(e) => handleFieldChange(e, meal.mealIndex, ii, "qty")}
                                                />

                                                <select
                                                    value={ingredient.unit}
                                                    className="w-[60px] text-center"
                                                    onChange={(e) => handleFieldChange(e, meal.mealIndex, ii, "unit")}
                                                >
                                                    {metricUnits.map((unit, index) => (
                                                        <option value={unit} key={index}>{unit}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )
                                    })}

                                    <Button
                                        className="self-end mt-4"
                                        onClick={() => handleAddIngredientButtonClick(meal.mealIndex)}
                                    >Add Ingredient</Button>
                                </div>
                            );
                        }
                    })}

                </div>
            </Dropdown>
        )
    }

    return (
        <>
            <h2 className="screen-header">Meals</h2>

            <div className="screen-body">
                <div className="flex flex-col gap-[10px]">
                    {(mealUpdates && mealUpdates.length > 0) &&
                        prepTimingOptions.map((option) => (
                            <div className="border border-grey-300 dark:border-grey-700 rounded-md">
                                {renderMealsByPrepTime(mealUpdates, option)}
                            </div>
                        ))
                    }

                    <Button
                        className="mt-6"
                        type="submit"
                    >Save</Button>
                </div>
            </div>
        </>
    );
}

export default MealsScreen;