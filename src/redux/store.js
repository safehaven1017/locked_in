import { createStore } from "redux";
import monthReducer from "./reducer";
import { devToolsEnhancer } from '@redux-devtools/extension';

const store = createStore(monthReducer, devToolsEnhancer())

export default store