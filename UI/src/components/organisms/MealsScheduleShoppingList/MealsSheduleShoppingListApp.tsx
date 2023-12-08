import "./MealsSheduleShoppingListApp.css";
import { FC } from 'react';
import MealsSheduleShoppingList, { TMealsSheduleShoppingList } from "./MealsSheduleShoppingList";
import { Provider } from "react-redux";
import store from "./redux/MealsScheduleShoppingList.store";

const MealsSheduleShoppingListApp: FC<TMealsSheduleShoppingList> = ({ defaultMeals }) => {
    return (
        <Provider store={store}>
            <MealsSheduleShoppingList defaultMeals={defaultMeals} />
        </Provider>
    );
};

export default MealsSheduleShoppingListApp;