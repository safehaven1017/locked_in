import { createMonth, calendarModule } from "../../calendarFunctions";

const defaultState = {
    day: calendarModule().getDaysCalendar(),
    calendarMonth: calendarModule().getCurrentDate().getMonth(),
    calendarYear: calendarModule().getCurrentDate().getFullYear(),
};

export default function dayReducer(state = defaultState, action) {
    switch (action.type) {
        case "SET_DAY":
            return {
                ...state,
                day: action.day,
                calendarMonth: action.day.month,
                calendarYear: action.day.year
            };
        case "PREVIOUS_DAY":
            return {
                ...state,
                day: action.day.number === 1 ?
                    createMonth(action.day.year, action.day.month - 1).reverse().find(day => day.inMonth)
                    :
                    calendarModule({ ...action.day, number: action.day.number - 1 }).getDaysCalendar(),
                calendarMonth: action.day.number === 1 ?
                    new Date(action.day.year, action.day.month - 1).getMonth()
                    :
                    action.day.month,
                calendarYear: action.day.number === 1 && action.day.month === 0 ?
                    action.day.year - 1
                    :
                    action.day.year
            };
        case "NEXT_DAY":
            return {
                ...state,
                day: createMonth(action.day.year, action.day.month).reverse().find(day => day.inMonth).number === action.day.number ?
                    createMonth(action.day.year, action.day.month + 1).find(day => day.inMonth)
                    :
                    calendarModule({ ...action.day, number: action.day.number + 1 }).getDaysCalendar(),
                calendarMonth: createMonth(action.day.year, action.day.month).reverse().find(day => day.inMonth).number === action.day.number ?
                    new Date(action.day.year, action.day.month + 1).getMonth()
                    :
                    action.day.month,
                calendarYear: createMonth(action.day.year, action.day.month).reverse().find(day => day.inMonth).number === action.day.number && action.day.month === 11 ?
                    action.day.year + 1
                    :
                    action.day.year
            };
        default:
            return state;
    }
}