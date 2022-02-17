import { createMonth } from "../calendarFunctions";

const currentDate = new Date();
const defaultMonth = createMonth(currentDate.getFullYear(), currentDate.getMonth());
const defaultState = {
    monthArray: createMonth(currentDate.getFullYear(), currentDate.getMonth()),
    calendarMonth: currentDate.getMonth(),
    calendarYear: currentDate.getFullYear()
};

export default function monthReducer(state = defaultState, action) {
    switch (action.type) {
        case "SET_MONTH":
            return {
                monthArray: createMonth(action.calendarYear, action.calendarMonth),
                calendarMonth: action.calendarMonth,
                calendarYear: action.calendarYear
            };
        case "PREVIOUS_MONTH":
            return {
                ...state,
                monthArray: createMonth(action.calendarYear, action.calendarMonth),
                calendarMonth: action.calendarMonth,
                calendarYear: action.calendarYear
            };
        case "NEXT_MONTH":
            return {
                ...state,
                monthArray: createMonth(action.calendarYear, action.calendarMonth),
                calendarMonth: action.calendarMonth,
                calendarYear: action.calendarYear
            };
        default:
            return state;
    }
}