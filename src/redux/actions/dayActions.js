export const setDay = (day) => {
    return {
        type: 'SET_DAY',
        day
    }
}

export const nextDay = (day) => {
    return {
        type: 'NEXT_DAY',
        day
    }
}

export const previousDay = (day) => {
    return {
        type: 'PREVIOUS_DAY',
        day
    }
}