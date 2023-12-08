import Button from "@/components/atoms/button/Button";
import { FC, ChangeEvent, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { updateActiveScreen } from "../redux/slices/activeScreen.slice";
import { daysOfWeek, prepTimingOptions } from "../types";

const GeneratorConfigScreen: FC = () => {
    const dispatch = useAppDispatch();
    const [selectedMeals, setSelectedMeals] = useState<{ [day: string]: string }>({});

    const handleMealOptionsSelectChange = (day: string, event: ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedMeals({ ...selectedMeals, [day]: value });
    };

    const handleGenerateButtonClick = () => {
        dispatch(updateActiveScreen("generatedMealsSchedule"));
    }

    return (
        <>
            <h2>Generator</h2>

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
                        <select
                            id={day.toLowerCase()}
                            key={day}
                            value={selectedMeals[day] || ''}
                            onChange={(e) => handleMealOptionsSelectChange(day, e)}
                        >
                            {prepTimingOptions.map((option) => (
                                <option key={option} value={option.toLowerCase()}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            ))}

            <Button
                className="mt-6"
                onClick={handleGenerateButtonClick}>
                Generate
            </Button>
        </>
    )
}

export default GeneratorConfigScreen;