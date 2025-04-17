import { createObserver } from './createObserver';

export const createStore = (initialState, initialActions) => {
  const { subscribe, notify } = createObserver();

  let state = { ...initialState };

  const setState = (newState) => {
    state = { ...state, ...newState };
    notify();
  };

  const getState = () => ({ ...state });

  let actions;
  if (initialActions) {
    actions = Object.fromEntries(
      Object.entries(initialActions).map(([key, value]) => [key, (...args) => setState(value(getState(), ...args))]),
    );
  } else {
    actions = null;
  }

  return { getState, setState, subscribe, actions };
};
