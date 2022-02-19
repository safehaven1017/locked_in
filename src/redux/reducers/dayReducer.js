import { createMonth, calendarModule } from "../../calendarFunctions";

const defaultState = {
    day: calendarModule().getWeekCalendar(),
    calendarMonth: calendarModule().getCurrentDate().getMonth(),
    calendarYear: calendarModule().getCurrentDate().getFullYear(),
};

export default function weekReducer(state = defaultState, action) {
    switch (action.type) {
        case "SET_DAY":
            return {
                ...state,
                dayArray: (Array.isArray(action.dayOrWeek) ? 
                calendarModule(action.dayOrWeek).getDaysCalendar() 
                : 
                calendarModule(action.dayOrWeek).getWeekCalendar()
                ),
                calendarMonth: action.calendarMonth,
                calendarYear: action.calendarYear
            };
        case "PREVIOUS_WEEK":
            const prevMonth = (action.calendarMonth === 0 ? 11 : action.calendarMonth - 1);
            const prevYear = (action.calendarMonth === 0 ? action.calendarYear - 1 : action.calendarYear);
            return {
                ...state,
                dayArray: createMonth(prevYear, prevMonth),
                calendarMonth: prevMonth,
                calendarYear: prevYear
            };
        case "NEXT_WEEK":
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