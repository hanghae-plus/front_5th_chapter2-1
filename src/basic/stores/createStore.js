export function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  function dispatch(action) {
    state = reducer(state, action);

    for (const listener of listeners) {
      listener(state);
    }
  }

  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      const idx = listeners.indexOf(listener);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }

  function getState() {
    return state;
  }

  return { dispatch, subscribe, getState };
}
