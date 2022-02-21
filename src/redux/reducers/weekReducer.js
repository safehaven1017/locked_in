import { calendarModule, getPreviousWeek, getNextWeek } from "../../calendarFunctions";

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
            const previousWeek = getPreviousWeek(action.week);
            return {
                ...state,
                dayArray: previousWeek,
                calendarMonth: action.week[0].week > 0 ?
                    previousWeek[0].inMonth ?
                        action.calendarMonth
                        :
                        new Date(action.calendarYear, action.calendarMonth - 1).getMonth()
                    :
                    action.calendarMonth,
                calendarYear: previousWeek[0].year
            };
        case "NEXT_WEEK":
            const nextWeek = getNextWeek(action.week);
            return {
                ...state,
                dayArray: nextWeek,
                calendarMonth: new Date(nextWeek[0].year, nextWeek[0].month).getMonth(),
                calendarYear: new Date(nextWeek[0].year, nextWeek[0].month).getFullYear()
            };
        default:
            return state;
    }
}