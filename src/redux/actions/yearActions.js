export const setYear = (year) => {
    return {
        type: 'SET_YEAR',
        year
    }
}
export const previousYear = () => {
    return {
        type: 'PREVIOUS_YEAR',
    }
}

export const nextYear = () => {
    return {
        type: 'NEXT_YEAR',
    }
}