// set the state object, this can hold other items too. state holds stores the current value of the item 
export const state = {
    currentId: null
};

// set a list of fucntions that are subscribed to listening for a change in state of items in state object
const listeners = [];

// hanfles setting new states and updatinng states, call set state with key value pair, then loop through the subscribers and notify them of the change "call them"
export function setState(newState) {
    Object.assign(state, newState);
    listeners.forEach((listener) => listener(state));
}

// subscribe / unsub fucntiom. call with fucntion name to subscribe, returns an unsubscribe function 
export function subscribe(listener) {
    listeners.push(listener);
    return () => {
        const index = listeners.indexOf(listener);
        if(index > -1) listeners.splice(index, 1);
    }
}
// to unsub - const unsub = subscrbe(listener);
//  unsub()