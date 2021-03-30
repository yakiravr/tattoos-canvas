export default function reducer(state = {}, actions) {
    if (actions.type === "GET_TATTOO") {
        state = {
            ...state,
            array: actions.array,
        };
    }

    return state;
}

