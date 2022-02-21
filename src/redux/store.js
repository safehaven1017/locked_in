import { createStore, combineReducers } from "redux";
import monthReducer from "./reducers/monthReducer";
import weekReducer from "./reducers/weekReducer";
import dayReducer from "./reducers/dayReducer";
import yearReducer from "./reducers/yearReducer";
import { devToolsEnhancer } from '@redux-devtools/extension';

// combine year, month, week, and day reducers
const rootReducer = combineReducers({
    year: yearReducer,
    month: monthReducer,
    week: weekReducer,
    day: dayReducer
})
const store = createStore(rootReducer, devToolsEnhancer());

export default store;