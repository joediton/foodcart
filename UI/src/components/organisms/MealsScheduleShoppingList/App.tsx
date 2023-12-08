import "./App.css";
import { FC } from 'react';
import AppInner, { TAppInner } from "./AppInner";
import { Provider } from "react-redux";
import store from "./redux/store";

const App: FC<TAppInner> = ({ defaultMeals }) => {
    return (
        <Provider store={store}>
            <AppInner defaultMeals={defaultMeals} />
        </Provider>
    );
};

export default App;