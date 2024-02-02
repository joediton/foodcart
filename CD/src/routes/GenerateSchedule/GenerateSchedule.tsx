import { FC, FormEvent, useState } from "react";
import { daysOfWeek, timingCategories } from "@/types";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Root from "../Root/Root";
import RootHeader from "@/components/RootHeader/RootHeader";

const GenerateSchedule: FC = () => {
    const [selectedMeals, setSelectedMeals] = useState<{ [day: string]: string }>({});

    const handleMealOptionsSelectChange = (event: SelectChangeEvent<string>) => {
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
                                    value={selectedMeals[day] || ''}
                                    onChange={handleMealOptionsSelectChange}
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
                                <p className="m-0">?</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </form>
    )
}

export default GenerateSchedule;