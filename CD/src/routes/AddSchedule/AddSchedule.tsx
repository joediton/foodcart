import { FC, FormEvent, useState } from "react";
import { TMeal, TMealsQueryResponse, daysOfWeek, timingCategories } from "@/types";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import RootHeader from "@/components/RootHeader/RootHeader";
import GET_MEALS_BY_TIMING_CATEGORY from "@/graphql/queries/getMealsByTimingCategory";
import { useQuery } from "@apollo/client";
import useAuth from "@/hooks/useAuth";

const AddSchedule: FC = () => {
    const { userId } = useAuth();
    const [
        selectedTimingCategories,
        setSelectedTimingCategories
    ] = useState<{ [day: string]: string }>({
        Monday: '',
        Tuesday: '',
        Wednesday: '',
        Thursday: '',
        Friday: '',
        Saturday: '',
        Sunday: '',
    });
    const [
        selectedMeals,
        setSelectedMeals
    ] = useState<{ [day: string]: string }>({
        Monday: '',
        Tuesday: '',
        Wednesday: '',
        Thursday: '',
        Friday: '',
        Saturday: '',
        Sunday: '',
    });
    const {
        data: quickMealsData,
        loading: quickMealsLoading,
        error: quickMealsError,
    } = useQuery<TMealsQueryResponse>(GET_MEALS_BY_TIMING_CATEGORY,
        { variables: { userId, timingCategory: "quick" } }
    );
    const {
        data: normalMealsData,
        loading: normalMealsLoading,
        error: normalMealsError,
    } = useQuery<TMealsQueryResponse>(GET_MEALS_BY_TIMING_CATEGORY,
        { variables: { userId, timingCategory: "normal" } }
    );
    const {
        data: slowMealsData,
        loading: slowMealsLoading,
        error: slowMealsError
    } = useQuery<TMealsQueryResponse>(GET_MEALS_BY_TIMING_CATEGORY,
        { variables: { userId, timingCategory: "slow" } }
    );
    const meals: { [mealType: string]: TMeal[] } = {
        quick: quickMealsData?.meals.data || [],
        normal: normalMealsData?.meals.data || [],
        slow: slowMealsData?.meals.data || [],
    }

    const handleTimingCategorySelection = (event: SelectChangeEvent<string>) => {
        const { value, name } = event.target;
        setSelectedTimingCategories({ ...selectedTimingCategories, [name]: value });
    };

    const handleMealSelection = (event: SelectChangeEvent<string>) => {
        const { value, name } = event.target;
        setSelectedMeals({ ...selectedMeals, [name]: value });
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <RootHeader>
                <h1>Add Schedule</h1>

                <Button
                    variant="outlined"
                    type="submit"
                >
                    Generate
                </Button>
            </RootHeader>

            {(quickMealsLoading || normalMealsLoading || slowMealsLoading) && (
                <p>Loading...</p>
            )}

            {(quickMealsError || normalMealsError || slowMealsError) && (
                <>
                    {quickMealsError && (
                        <p>Error: ${quickMealsError.message}</p>
                    )}

                    {normalMealsError && (
                        <p>Error: ${normalMealsError.message}</p>
                    )}

                    {slowMealsError && (
                        <p>Error: ${slowMealsError.message}</p>
                    )}
                </>
            )}

            {(meals.quick.length > 0 &&
                meals.normal.length > 0 &&
                meals.slow.length > 0) && (
                    <div className="flex flex-col gap-[10px] w-full">
                        <div className="flex flex-col gap-[10px]">
                            <div className='grid grid-cols-3 gap-[20px] items-center pb-2'>
                                <div className="col-span-1">
                                    <p className="font-bold m-0">Day</p>
                                </div>

                                <div className="col-span-1">
                                    <p className="font-bold m-0">Timing</p>
                                </div>

                                <div className="col-span-1">
                                    <p className="font-bold m-0">Meal</p>
                                </div>
                            </div>

                            {daysOfWeek.map((day) => (
                                <div className='grid grid-cols-3 gap-[20px] items-center' key={day}>
                                    <div className="col-span-1">
                                        <label className="m-0 p-0" htmlFor={day.toLowerCase()}>{day}</label>
                                    </div>

                                    <div className="col-span-1">
                                        <Select
                                            size="small"
                                            id={day.toLowerCase()}
                                            value={selectedTimingCategories[day] || ''}
                                            onChange={handleTimingCategorySelection}
                                            className="w-full"
                                            required={true}
                                            name={day}
                                        >
                                            {timingCategories.map((option) => (
                                                <MenuItem key={option} value={option.toLowerCase()}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>

                                    <div className="col-span-1">
                                        <Select
                                            size="small"
                                            id={day.toLowerCase()}
                                            value={selectedMeals[day] || ''}
                                            onChange={handleMealSelection}
                                            className="w-full"
                                            required={true}
                                            name={day}
                                            disabled={!selectedTimingCategories[day]}
                                        >
                                            {(selectedTimingCategories[day] && meals[selectedTimingCategories[day]]) &&
                                                meals[selectedTimingCategories[day]].map((meal) => (
                                                    <MenuItem key={meal.id} value={meal.attributes.name}>
                                                        {meal.attributes.name}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
        </form>
    )
}

export default AddSchedule;