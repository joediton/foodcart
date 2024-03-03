import { FC, FormEvent, useState } from "react";
import { TMeal, TMealsQueryResponse, TSchedulesQueryResponse, daysOfWeek, timingCategories } from "@/types";
import { Button, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import RootHeader from "@/components/RootHeader/RootHeader";
import { useMutation, useQuery } from "@apollo/client";
import useAuth from "@/hooks/useAuth";
import All_MEALS from "@/graphql/queries/allMeals";
import CREATE_SCHEDULE from "@/graphql/mutations/createSchedule";
import All_SCHEDULES from "@/graphql/queries/allSchedules";
import { useNavigate } from "react-router";

const AddSchedule: FC = () => {
    const navigate = useNavigate();

    const { userId } = useAuth();

    const [name, setName] = useState("");

    const [
        selectedTimingCategories,
        setSelectedTimingCategories
    ] = useState<{ [day: string]: string }>({
        Monday: 'quick',
        Tuesday: 'quick',
        Wednesday: 'quick',
        Thursday: 'quick',
        Friday: 'quick',
        Saturday: 'quick',
        Sunday: 'quick',
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

    const { data, loading, error } = useQuery<TMealsQueryResponse>(All_MEALS,
        { variables: { userId } }
    );

    const mealsData = data?.meals.data;

    const variables = {
        name,
        monday: {
            timingCategory: selectedTimingCategories.Monday,
            meal: selectedMeals.Monday,
        },
        tuesday: {
            timingCategory: selectedTimingCategories.Tuesday,
            meal: selectedMeals.Tuesday,
        },
        wednesday: {
            timingCategory: selectedTimingCategories.Wednesday,
            meal: selectedMeals.Wednesday,
        },
        thursday: {
            timingCategory: selectedTimingCategories.Thursday,
            meal: selectedMeals.Thursday,
        },
        friday: {
            timingCategory: selectedTimingCategories.Friday,
            meal: selectedMeals.Friday,
        },
        saturday: {
            timingCategory: selectedTimingCategories.Saturday,
            meal: selectedMeals.Saturday,
        },
        sunday: {
            timingCategory: selectedTimingCategories.Sunday,
            meal: selectedMeals.Sunday,
        },
        userId,
    };

    const [createSchedule] = useMutation(CREATE_SCHEDULE, {
        variables,
        update(cache, { data }) {
            const newSchedule = data?.createSchedule.data;
            const existingSchedules: TSchedulesQueryResponse = cache.readQuery({ query: All_SCHEDULES, variables });
            if (!newSchedule || !existingSchedules) return;

            cache.writeQuery({
                query: All_SCHEDULES,
                variables,
                data: {
                    schedules: {
                        data: [...existingSchedules.schedules.data, newSchedule],
                    }
                }
            });
        }
    });

    const meals: { [mealType: string]: TMeal[] } = {
        quick: mealsData ? [...mealsData].filter(meal => meal.attributes.timingCategory === "quick") : [],
        normal: mealsData ? [...mealsData].filter(meal => meal.attributes.timingCategory === "normal") : [],
        slow: mealsData ? [...mealsData].filter(meal => meal.attributes.timingCategory === "slow") : [],
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
        createSchedule();
        navigate('/schedules');
    };

    const handleRandomiseMeals = () => {
        const randomMeals: { [day: string]: string } = {};

        for (const [key, value] of Object.entries(selectedTimingCategories)) {
            randomMeals[key] = meals[value] ?
                meals[value][Math.floor(Math.random() * meals[value].length)].id
                : '';
        }

        setSelectedMeals(randomMeals);
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <RootHeader>
                <h1>Add Schedule</h1>
            </RootHeader>

            {loading && (
                <p>Loading...</p>
            )}

            {error && (
                <>
                    <p>Error: ${error.message}</p>
                </>
            )}

            {(meals.quick.length > 0 &&
                meals.normal.length > 0 &&
                meals.slow.length > 0) && (

                    <div className="flex flex-col gap-[10px] w-full">
                        <TextField
                            size="small"
                            label="Name"
                            type="text"
                            value={name}
                            className="w-full"
                            onChange={(e) => setName(e.target.value)}
                            required={true}
                        />

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
                                                    <MenuItem key={meal.id} value={meal.id}>
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

            <div className="flex justify-between gap-[10px] w-full mt-[30px]">
                <Button
                    variant="outlined"
                    type="button"
                    onClick={handleRandomiseMeals}
                >
                    Randomise Meals
                </Button>

                <Button
                    variant="outlined"
                    type="submit"
                >
                    Add
                </Button>
            </div>
        </form>
    )
}

export default AddSchedule;