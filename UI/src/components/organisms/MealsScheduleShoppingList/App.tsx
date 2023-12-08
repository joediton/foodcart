import "./App.css";
import { FC } from 'react';
import MealsSheduleShoppingList, { TMealsSheduleShoppingList } from "./MealsSheduleShoppingList";
import { Provider } from "react-redux";
import store from "./redux/store";

const App: FC<TMealsSheduleShoppingList> = ({ defaultMeals }) => {
    return (
        <Provider store={store}>
            <MealsSheduleShoppingList defaultMeals={defaultMeals} />
        </Provider>
    );
};

export default App;