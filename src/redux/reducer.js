const defaultState = {
    incrementer: 0,
    list: []
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "ADD_ITEM":
            return { 
                ...state,
                incrementer: state.incrementer + 1,
                list: [ ...state.list, action.item ] || state.list
            };

        case "DELETE_ITEM":
            return { 
                ...state,
                list: state.list.filter(item => {
                    return (item.id !== action.id)
                })
            };

        case "EDIT_ITEM":
            return { 
                ...state,
                list: state.list.map(item => {
                    if (item.id === action.id) {
                        return { ...item, text: action.text };
                    } else {
                        return item;
                    }
                })
            };

        default:
            return state;
    }
}