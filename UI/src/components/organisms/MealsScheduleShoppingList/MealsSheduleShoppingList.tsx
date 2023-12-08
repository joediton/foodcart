import "./MealsSheduleShoppingListApp.css";
import { FC, useEffect } from 'react';
import GeneratorScreen from "./screens/MealsSheduleGeneratorScreen";
import GeneratedMealsScheduleScreen from "./screens/GeneratedMealsScheduleScreen";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useAppDispatch, useAppSelector } from "./redux/MealsScheduleShoppingList.hooks";
import Navigation from "./components/Navigation";
import { updateAllMeals } from "./redux/slices/meals.slice";
import MealsScreen from "./screens/MealsScreen";
import { TMealProps } from "./MealsSheduleShoppingListApp.types";

export type TMealsSheduleShoppingList = {
    defaultMeals: TMealProps[];
}

const MealsSheduleShoppingList: FC<TMealsSheduleShoppingList> = ({ defaultMeals }) => {
    const dispatch = useAppDispatch();
    const activeScreen = useAppSelector(state => state.activeScreen.value);

    const variants = {
        active: { opacity: 1, translateX: "0" },
        inactive: { opacity: 0, translateY: "100vh" },
    }

    useEffect(() => {
        if (defaultMeals) {
            dispatch(updateAllMeals(defaultMeals))
        }
    }, [defaultMeals, dispatch])

    return (
        <div className='foodcart'>
            <LazyMotion features={domAnimation}>
                <m.div
                    className="foodcart__screen"
                    animate={activeScreen === "meals" ? "active" : "inactive"}
                    variants={variants}
                >
                    <MealsScreen />
                </m.div>

                <m.div
                    className="foodcart__screen"
                    animate={activeScreen === "mealsScheduleGenerator" ? "active" : "inactive"}
                    variants={variants}
                >
                    <GeneratorScreen />
                </m.div>

                <m.div
                    className="foodcart__screen"
                    animate={activeScreen === "generatedMealsSchedule" ? "active" : "inactive"}
                    variants={variants}
                >
                    <GeneratedMealsScheduleScreen />
                </m.div>
            </LazyMotion>

            <Navigation />
        </div>
    );
};

export default MealsSheduleShoppingList;