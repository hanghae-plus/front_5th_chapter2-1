import { createObserver } from "./createObserver";

export const createStore = (initialState, initialActions = {}) => {
  const { subscribe, notify } = createObserver();

  let state = { ...initialState };

  const setState = (newState) => {
    state = { ...state, ...newState };
    notify();
  };

  const getState = () => ({ ...state });

  const actions = Object.fromEntries(
    Object.entries(initialActions).map(([key, value]) => [
      key,
      (...args) => {
        const result = value(getState(), ...args);
        if (result) {
          setState(result);
        }
        return result;
      },
    ])
  );

  return { getState, setState, subscribe, actions };
};
