// state.js
const state = {
    productList: [],
    lastSelectedProduct: null,
    bonusPoints: 0
};

export const getState = () => state;

export const setState = (partialState) => {
    Object.assign(state, partialState);
};
