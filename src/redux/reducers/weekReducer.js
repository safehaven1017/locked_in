import { createMonth, calendarModule, findMonthFromCalendar, getPreviousWeek } from "../../calendarFunctions";

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
                dayArray: (Array.isArray(action.dayOrWeek) ? 
                calendarModule(action.dayOrWeek).getDaysCalendar() 
                : 
                calendarModule(action.dayOrWeek).getWeekCalendar()
                ),
                calendarMonth: action.calendarMonth,
                calendarYear: action.calendarYear
            };
        case "PREVIOUS_WEEK":
            const newWeek = getPreviousWeek(action.week);
            console.log(newWeek);
            return {
                ...state,
                dayArray: newWeek,
                calendarMonth: action.week[0].week > 0 ?
                    newWeek[0].inMonth ?
                        action.calendarMonth
                        :
                        new Date(action.calendarYear, action.calendarMonth - 1).getMonth()
                    :
                    action.calendarMonth,
                calendarYear: newWeek[0].year
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