import "./App.css";
import { FC, useEffect } from 'react';
import { LazyMotion, domAnimation, m } from "framer-motion";
import { updateAllMeals } from "./redux/slices/meals.slice";
import MealsScreen from "./screens/MealsScreen";
import { TMealProps } from "./types";
import Navigation from "@/components/molecules/Navigation/Navigation";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import GeneratorConfigScreen from "./screens/GeneratorConfigScreen";
import ScheduleScreen from "./screens/ScheduleScreen";

export type TAppInner = {
    defaultMeals: TMealProps[];
}

const AppInner: FC<TAppInner> = ({ defaultMeals }) => {
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
                    animate={activeScreen === "generatorConfig" ? "active" : "inactive"}
                    variants={variants}
                >
                    <GeneratorConfigScreen />
                </m.div>

                <m.div
                    className="foodcart__screen"
                    animate={activeScreen === "schedule" ? "active" : "inactive"}
                    variants={variants}
                >
                    <ScheduleScreen />
                </m.div>
            </LazyMotion>

            <Navigation />
        </div>
    );
};

export default AppInner;