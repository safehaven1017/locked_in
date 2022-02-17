import { createStore } from "redux";
import monthReducer from "./reducers/monthReducer";
import { devToolsEnhancer } from '@redux-devtools/extension';

const store = createStore(monthReducer, devToolsEnhancer());

export default store;