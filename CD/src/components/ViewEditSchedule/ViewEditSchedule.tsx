import { TMeal, TMealsQueryResponse, TSchedule, TSchedulesQueryResponse, daysOfWeek, timingCategories } from "@/types";
import React, { FormEvent } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMutation, useQuery } from "@apollo/client";
import useAuth from "@/hooks/useAuth";
import UPDATE_SCHEDULE from "@/graphql/mutations/updateSchedule";
import All_SCHEDULES from "@/graphql/queries/allSchedules";
import DELETE_SCHEDULE from "@/graphql/mutations/deleteSchedule";
import All_MEALS from "@/graphql/queries/allMeals";

export type TViewEditScheduleProps = TSchedule;

const ViewEditSchedule: React.FC<TViewEditScheduleProps> = (props) => {
    const { userId } = useAuth();
    const [editMode, setEditMode] = React.useState(false);
    const [name, setName] = React.useState(props.attributes.name || "");

    const [
        selectedTimingCategories,
        setSelectedTimingCategories
    ] = React.useState<{ [day: string]: string }>({
        Monday: props.attributes.monday.timingCategory,
        Tuesday: props.attributes.tuesday.timingCategory,
        Wednesday: props.attributes.wednesday.timingCategory,
        Thursday: props.attributes.thursday.timingCategory,
        Friday: props.attributes.friday.timingCategory,
        Saturday: props.attributes.saturday.timingCategory,
        Sunday: props.attributes.sunday.timingCategory,
    });

    const [
        selectedMeals,
        setSelectedMeals
    ] = React.useState<{ [day: string]: string }>({
        Monday: props.attributes.monday.meal.data.id,
        Tuesday: props.attributes.tuesday.meal.data.id,
        Wednesday: props.attributes.wednesday.meal.data.id,
        Thursday: props.attributes.thursday.meal.data.id,
        Friday: props.attributes.friday.meal.data.id,
        Saturday: props.attributes.saturday.meal.data.id,
        Sunday: props.attributes.sunday.meal.data.id,
    });

    const { data, loading, error } = useQuery<TMealsQueryResponse>(All_MEALS,
        { variables: { userId } }
    );

    const mealsData = data?.meals.data;

    const [updateSchedule] = useMutation(UPDATE_SCHEDULE, {
        variables: {
            id: props.id,
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
        },
        update(cache, { data }) {
            const updatedSchedule = data?.updateSchedule.data;
            const existingSchedules: TSchedulesQueryResponse = cache.readQuery({ query: All_SCHEDULES, variables: { userId } });
            if (!updatedSchedule || !existingSchedules) return;

            cache.writeQuery({
                query: All_SCHEDULES,
                variables: { userId },
                data: {
                    schedules: {
                        data: existingSchedules?.schedules.data.map((shedule: TSchedule) => {
                            if (shedule.id === updatedSchedule.id) {
                                return updatedSchedule;
                            }
                            return shedule;
                        }),
                    }
                }
            });
        }
    });

    const [deleteSchedule] = useMutation(DELETE_SCHEDULE, {
        variables: {
            id: props.id,
        },
        update(cache, { data }) {
            const deletedSchedule = data?.deleteSchedule.data;
            const existingSchedules: TSchedulesQueryResponse = cache.readQuery({ query: All_SCHEDULES, variables: { userId } });
            if (!deletedSchedule || !existingSchedules) return;

            cache.writeQuery({
                query: All_SCHEDULES,
                variables: { userId },
                data: {
                    schedules: {
                        data: existingSchedules?.schedules.data.filter((schedule: TSchedule) => schedule.id !== deletedSchedule.id),
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

    const handleEditButtonClick = (): void => {
        setEditMode(true);
    }

    const handleDeleteScheduleButtonClick = (): void => {
        const confirmed = window.confirm("Are you sure you want to delete this schedule?");
        if (!confirmed) return;

        deleteSchedule();
    }

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateSchedule();
        setEditMode(false);
    }

    const printMealName = (mealId: string) => {
        const meal = mealsData?.find(meal => meal.id === mealId);
        return meal ? meal.attributes.name : '';
    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <h2 className="my-0">{name}</h2>
            </AccordionSummary>

            <AccordionDetails>
                {loading && (
                    <p>Loading...</p>
                )}

                {error && (
                    <>
                        <p>Error: ${error.message}</p>
                    </>
                )}

                {!editMode && (
                    <div className="flex flex-col gap-[30px] items-start">
                        <div className="flex flex-col gap-[10px] w-full">
                            <div className='grid grid-cols-3 gap-[20px] items-center pb-2 text-center'>
                                <div className="col-span-1 text-left">
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
                                <div className='grid grid-cols-3 gap-[20px] items-center text-center' key={day}>
                                    <div className="col-span-1 text-left">
                                        <label className="m-0 p-0" htmlFor={day.toLowerCase()}>{day}</label>
                                    </div>

                                    <div className="col-span-1">
                                        {selectedTimingCategories[day]}
                                    </div>

                                    <div className="col-span-1">
                                        {printMealName(selectedMeals[day])}
                                    </div>
                                </div>
                            ))}
                        </div>

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

                        <div className="flex flex-col gap-[10px]">
                            <div className='grid grid-cols-3 gap-[20px] items-center pb-2 text-center'>
                                <div className="col-span-1 text-left">
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
                                                    <MenuItem
                                                        key={meal.id}
                                                        value={meal.id}>
                                                        {meal.attributes.name}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-[20px] justify-between">
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={handleDeleteScheduleButtonClick}
                            >Delete Schedule</Button>

                            <Button
                                type="submit"
                                variant="outlined"
                            >Save Schedule</Button>
                        </div>
                    </form>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

export default ViewEditSchedule;