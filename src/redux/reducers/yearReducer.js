const defaultState = new Date().getFullYear();

export default function yearReducer(state = defaultState, action) {
    switch (action.type) {
        case "SET_YEAR":
            return action.year;
        case "PREVIOUS_YEAR":
            return state - 1;
        case "NEXT_YEAR":
            return state + 1;
        default:
        return state;
    };
}