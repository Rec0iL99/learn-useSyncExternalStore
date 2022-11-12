function createStore(initialState) {
    let currentState = initialState;

    // using set to avoid duplicates of listeners
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
            // listener is a function
            // listener is basically a callback
            listeners.add(listener);

            // when you subscribe you get another function returned which can be used to unsubscribe
            return () => listeners.delete(listener);
        }
    }
}

const store = createStore({
    value1: 0,
    value2: 0,
})

export default store;