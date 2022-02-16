import { createMonth } from "../calendarFunctions";
const currentDate = new Date();
const defaultMonth = createMonth(currentDate.getFullYear(), currentDate.getMonth());
const defaultState = {
    month: defaultMonth
};

export default function monthReducer(state = defaultState, action) {
    switch (action.type) {
        case "SET_MONTH":
            return {
                ...state,
                month: action.month
            };
        default:
            return state;
    }
}