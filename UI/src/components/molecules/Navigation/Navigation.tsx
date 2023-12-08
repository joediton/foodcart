import { FC } from 'react';
import { updateActiveScreen } from '../../organisms/MealsScheduleShoppingList/redux/slices/activeScreen.slice';
import { useAppDispatch, useAppSelector } from '@/components/organisms/MealsScheduleShoppingList/redux/hooks';
import { TScreens } from '@/components/organisms/MealsScheduleShoppingList/types';

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
                disabled={activeScreen === "generatorConfig"}
                onClick={() => handleNavButtonClick("generatorConfig")}>

            </button>

            <button
                disabled={activeScreen === "schedule"}
                onClick={() => handleNavButtonClick("schedule")}>
                Generated Meals Schedule
            </button>

            <button>
                Shopping List
            </button>
        </div>
    );
};

export default Navigation;