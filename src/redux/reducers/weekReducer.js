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
                dayArray: (Array.isArray(action.dayOrWeek) ? 
                calendarModule(action.dayOrWeek).getDaysCalendar() 
                : 
                calendarModule(action.dayOrWeek).getWeekCalendar()
                ),
                calendarMonth: action.calendarMonth,
                calendarYear: action.calendarYear
            };
        case "PREVIOUS_WEEK":
            const newWeek = action.day.week === 0 ? 
                action.day.inMonth ?
                createMonth(action.calendarYear, action.calendarMonth - 1).filter((_, index) => index > createMonth(action.calendarYear, action.calendarMonth - 1).length - 8)
                :
                createMonth(action.calendarYear, action.calendarMonth - 1).filter((_, index) => index > createMonth(action.calendarYear, action.calendarMonth - 1).length - 15)
            :
            createMonth(action.calendarYear, action.calendarMonth).filter(day => day.week === action.day.week - 1);
            return {
                ...state,
                dayArray: newWeek,
                calendarMonth: newWeek[0].month,
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