import { createMonth, createWeek } from "../../calendarFunctions";

const currentDate = new Date();
const currentMonth = createMonth(currentDate.getFullYear(), currentDate.getMonth());
const currentWeek = createWeek(currentMonth, )

const defaultState = {
    dayArray: createMonth(currentDate.getFullYear(), currentDate.getMonth()),
    calendarMonth: currentDate.getMonth(),
    calendarYear: currentDate.getFullYear(),
};

export default function monthReducer(state = defaultState, action) {
    switch (action.type) {
        case "SET_MONTH":
            return {
                ...state,
                dayArray: createMonth(action.calendarYear, action.calendarMonth),
                calendarMonth: action.calendarMonth,
                calendarYear: action.calendarYear
            };
        case "PREVIOUS_MONTH":
            const prevMonth = (action.calendarMonth === 0 ? 11 : action.calendarMonth - 1);
            const prevYear = (action.calendarMonth === 0 ? action.calendarYear - 1 : action.calendarYear);
            return {
                ...state,
                dayArray: createMonth(prevYear, prevMonth),
                calendarMonth: prevMonth,
                calendarYear: prevYear
            };
        case "NEXT_MONTH":
            const nextMonth = ((action.calendarMonth + 1) % 12);
            const nextYear = (action.calendarMonth === 11 ? action.calendarYear + 1 : action.calendarYear);
            return {
                ...state,
                dayArray: createMonth(nextYear, nextMonth),
                calendarMonth: nextMonth,
                calendarYear: nextYear
            };
        default:
            return state;
    }
}