
let state = {
    lastSelectedProduct: null,
    stock: {
      p1: { name: "상품1", price: 10000, quantity: 50, originQty: 50 },
      p2: { name: "상품2", price: 20000, quantity: 30, originQty: 30 },
      p3: { name: "상품3", price: 30000, quantity: 20, originQty: 20 },
      p4: { name: "상품4", price: 15000, quantity: 0, originQty: 0 },
      p5: { name: "상품5", price: 25000, quantity: 10, originQty: 10 },
    },
};

const cart = {
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0,
};

export default (render) => {
    const handler = {
        get(target, prop) {
            return Reflect.get(target, prop);
        },
        set: function (target, prop, value) {
            state.stock[prop].quantity = state.stock[prop].originQty - value;
            target[prop] = value;
            render();
            return true;
        },
    };
    let cartState = new Proxy(cart, handler);
    return {cartState, state}
}