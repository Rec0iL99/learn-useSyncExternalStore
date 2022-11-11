function createStore(initialState) {
    let currentState = initialState;

    // using set to avoid duplicates
    const listeners = new Set();

    return {
        getState: () => currentState,
        setState: (newState) => {
            // now setState is where a notification that something has changed needs to be sent out
            currentState = newState;
            // call each listener function with currentState passed as parameter
            listeners.forEach((listener) => listener(currentState));
        },
        subscibe: (listener) => {
            // listener is basically a callback
            listeners.add(listener);
            return () => listeners.delete(listener);
        }
    }
}

const store = createStore({
    value1: 0,
    value2: 0,
})

export default store;