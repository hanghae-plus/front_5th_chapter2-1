export function createStore(initialState = {}) {
  let state = { ...initialState };
  const listeners = new Set();

  return {
    getState() {
      return { ...state };
    },
    setState(partialState) {
      state = { ...state, ...partialState };
      listeners.forEach((fn) => fn(state));
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
