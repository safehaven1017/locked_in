import { createMonth, calendarModule } from "../../calendarFunctions";

const defaultState = {
    dayArray: calendarModule().getWeekCalendar(),
    calendarMonth: calendarModule().getCurrentDate().getMonth(),
    calendarYear: calendarModule().getCurrentDate().getFullYear(),
};

export default function weekReducer(state = defaultState, action) {
    switch (action.type) {
        case "SET_WEEK":
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