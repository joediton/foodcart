import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/MealsScheduleShoppingList.hooks';
import { TScreens } from '../MealsSheduleShoppingListApp.types';
import { updateActiveScreen } from '../redux/slices/activeScreen.slice';

const Navigation: FC = () => {
    const dispatch = useAppDispatch();
    const activeScreen = useAppSelector(state => state.activeScreen.value);

    const handleNavButtonClick = (screen: TScreens) => {
        dispatch(updateActiveScreen(screen));
    }

    return (
        <div className='foodcart__nav'>
            <button
                disabled={activeScreen === "meals"}
                onClick={() => handleNavButtonClick("meals")}>
                Meals
            </button>

            <button
                disabled={activeScreen === "mealsScheduleGenerator"}
                onClick={() => handleNavButtonClick("mealsScheduleGenerator")}>

            </button>

            <button
                disabled={activeScreen === "generatedMealsSchedule"}
                onClick={() => handleNavButtonClick("generatedMealsSchedule")}>
                Generated Meals Schedule
            </button>

            <button>
                Shopping List
            </button>
        </div>
    );
};

export default Navigation;