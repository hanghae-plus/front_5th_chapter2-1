const createStore = (initialState) => {
  const state = { ...initialState };
  const listeners = new Set();

  return {
    getState: () => state,
    update: (newState) => {
      Object.assign(state, newState);
      listeners.forEach((listener) => listener(state));
    },
  };
};
export default createStore;
