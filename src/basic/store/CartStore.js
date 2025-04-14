export const CartStore = (() => {
  const state = {
    itemCount: 0,
    subTotal: 0,
    totalAmount: 0,
  };

  const get = (key) => {
    return key ? state[key] : { ...state };
  };

  const set = (key, value) => {
    if (state[key] === value) return;
    state[key] = value;
  };

  return { get, set };
})();
