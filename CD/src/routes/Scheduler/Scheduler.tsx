import { FC, FormEvent, useState } from "react";
import { daysOfWeek, timingCategories } from "@/types";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";

const Scheduler: FC = () => {
    const [selectedMeals, setSelectedMeals] = useState<{ [day: string]: string }>({});

    const handleMealOptionsSelectChange = (event: SelectChangeEvent<string>) => {
        const { value, name } = event.target;
        setSelectedMeals({ ...selectedMeals, [name]: value });
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <>
            <h1>Scheduler</h1>

            <form onSubmit={handleFormSubmit} className=" w-full">
                <div className="flex flex-col gap-[10px]">
                    <div className='flex items-center pb-4'>
                        <div className="w-1/3">
                            <h3 className="m-0">Day</h3>
                        </div>

                        <div className="w-2/3">
                            <h3 className="m-0">Timing Category</h3>
                        </div>
                    </div>

                    {daysOfWeek.map((day) => (
                        <div className='flex items-center' key={day}>
                            <div className="w-1/3">
                                <label className="m-0 p-0" htmlFor={day.toLowerCase()}>{day}</label>
                            </div>

                            <div className="w-2/3">
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
                        </div>
                    ))}
                </div>

                <div className="mt-[30px]">
                    <Button
                        variant="outlined"
                        type="submit"
                    >
                        Generate
                    </Button>
                </div>
            </form>

        </>
    )
}

export default Scheduler;