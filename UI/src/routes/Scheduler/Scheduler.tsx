import { FC, ChangeEvent, useState } from "react";
import { daysOfWeek, prepTimingOptions } from "@/types";
import { Button, MenuItem, Select } from "@mui/material";

const Scheduler: FC = () => {
    const [selectedMeals, setSelectedMeals] = useState<{ [day: string]: string }>({});

    const handleMealOptionsSelectChange = (day: string, event: ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedMeals({ ...selectedMeals, [day]: value });
    };

    return (
        <>
            <h2>Scheduler</h2>

            <div className='foodcart__row'>
                <div>
                    <h3>Day</h3>
                </div>

                <div>
                    <h3>Prep & Cook Time</h3>
                </div>
            </div>

            {daysOfWeek.map((day) => (
                <div className='foodcart__row' key={day}>
                    <div>
                        <label htmlFor={day.toLowerCase()}>{day}</label>
                    </div>

                    <div>
                        <Select
                            id={day.toLowerCase()}
                            value={selectedMeals[day] || ''}
                            onChange={(e) => handleMealOptionsSelectChange(day, e)}
                            className="w-full"
                        >
                            {prepTimingOptions.map((option) => (
                                <MenuItem key={option} value={option.toLowerCase()}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
            ))}

            <Button
                variant="outlined"
            >
                Generate
            </Button>
        </>
    )
}

export default Scheduler;