export const setWeek = (dayOrWeek, calendarMonth, calendarYear) => {
    return {
        type: 'SET_WEEK',
        dayOrWeek,
        calendarMonth,
        calendarYear
    }
}

export const nextMonth = (calendarMonth, calendarYear) => {
    return {
        type: 'NEXT_WEEK',
        calendarMonth,
        calendarYear
    }
}

export const previousWeek = (week, calendarMonth, calendarYear) => {
    return {
        type: 'PREVIOUS_WEEK',
        week,
        calendarMonth,
        calendarYear
    }
}