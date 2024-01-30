import { FC, useState } from "react";
import { daysOfWeek, timingCategories } from "@/types";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";

const Scheduler: FC = () => {
    const [selectedMeals, setSelectedMeals] = useState<{ [day: string]: string }>({});

    const handleMealOptionsSelectChange = (day: string, event: SelectChangeEvent<string>) => {
        const { value } = event.target;
        setSelectedMeals({ ...selectedMeals, [day]: value });
    };

    return (
        <>
            <h1>Scheduler</h1>

            <div className='flex items-center py-4'>
                <div className="w-1/2">
                    <h3 className="m-0">Day</h3>
                </div>

                <div className="w-1/2">
                    <h3 className="m-0">Timing Category</h3>
                </div>
            </div>

            <div className="flex flex-col gap-[10px]">
                {daysOfWeek.map((day) => (
                    <div className='flex items-center' key={day}>
                        <div className="w-1/2">
                            <label className="m-0 p-0" htmlFor={day.toLowerCase()}>{day}</label>
                        </div>

                        <div className="w-1/2">
                            <Select
                                id={day.toLowerCase()}
                                value={selectedMeals[day] || ''}
                                onChange={(e) => handleMealOptionsSelectChange(day, e)}
                                className="w-full"
                            >
                                {timingCategories.map((option) => (
                                    <MenuItem key={option} value={option.toLowerCase()}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-[20px]">
                <Button
                    variant="outlined"
                >
                    Generate
                </Button>
            </div>
        </>
    )
}

export default Scheduler;