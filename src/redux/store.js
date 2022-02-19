import { createStore, combineReducers } from "redux";
import monthReducer from "./reducers/monthReducer";
import weekReducer from "./reducers/weekReducer";
import dayReducer from "./reducers/dayReducer";
import { devToolsEnhancer } from '@redux-devtools/extension';

// combine year, month, week, and day reducers
const rootReducer = combineReducers({
    month: monthReducer,
    week: weekReducer,
    day: dayReducer
})
const store = createStore(rootReducer, devToolsEnhancer());

export default store;