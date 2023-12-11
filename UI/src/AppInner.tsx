import "@/App.css";
import { FC, useEffect } from 'react';
import { LazyMotion, domAnimation, m } from "framer-motion";
import MealsScreen from "@/components/organisms/MealsScreen";
import Navigation from "@/components/molecules/Navigation/Navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import GeneratorConfigScreen from "@/components/organisms/GeneratorConfigScreen";
import ScheduleScreen from "@/components/organisms/ScheduleScreen";
import { updateAllMeals } from "./redux/slices/meals.slice";

const AppInner: FC = () => {
    const dispatch = useAppDispatch();
    const activeScreen = useAppSelector(state => state.activeScreen.value);

    const variants = {
        active: { opacity: 1, translateX: "0" },
        inactive: { opacity: 0, translateY: "100vh" },
    }

    useEffect(() => {
        getMeals();
    }, [])

    async function getMeals() {
        const response = await fetch("/meals");
        const meals = await response.json();
        dispatch(updateAllMeals(meals));
    }

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