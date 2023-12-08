import { FC } from 'react';
import { daysOfWeek } from "../MealsSheduleShoppingListApp.types";

const GeneratedMealsScheduleScreen: FC = () => {
    return (
        <>
            <h2>Meals Schedule</h2>

            <div className='foodcart__row'>
                <div>
                    <h3>Day</h3>
                </div>

                <div>
                    <h3>Meal</h3>
                </div>
            </div>

            {daysOfWeek.map((day, index: number) => (
                <div className='foodcart__row' key={day}>
                    <div>
                        <p className="mb-0">{day}</p>
                    </div>

                    <div>
                        Meal {index}
                    </div>
                </div>
            ))}
        </>
    );
};

export default GeneratedMealsScheduleScreen;