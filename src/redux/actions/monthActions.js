export const setMonth = (calendarMonth, calendarYear) => {
    return {
        type: 'SET_MONTH',
        calendarMonth,
        calendarYear
    }
}

export const nextMonth = (calendarMonth, calendarYear) => {
    return {
        type: 'NEXT_MONTH',
        calendarMonth,
        calendarYear
    }
}

export const previousMonth = (calendarMonth, calendarYear) => {
    return {
        type: 'PREVIOUS_MONTH',
        calendarMonth,
        calendarYear
    }
}