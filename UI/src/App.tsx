import "./App.css";
import { FC } from 'react';
import AppInner from "@/AppInner";
import { Provider } from "react-redux";
import store from "@/redux/store";

const App: FC = () => {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
};

export default App;