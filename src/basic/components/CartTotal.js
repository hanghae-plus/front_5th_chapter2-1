import { state } from "../store/state.js";

function CartTotal() {
  const container = document.createElement("div");

  const render = () => {
    const totalPrice = state.get("totalPrice");
    const itemTotal = state.get("itemTotal");
    const discountRate = state.get("discountRate");
    const bonusPoint = state.get("bonusPoint");

    container.innerHTML = `
    <div id="cart-total" class="text-xl font-bold my-4">
      총액: ${Math.round(totalPrice)}원${
        discountRate > 0
          ? `<span class="text-green-500 ml-2">(${(discountRate * 100).toFixed(1)}% 할인 적용)</span>`
          : ""
      }<span id="loyalty-points" class="text-blue-500 ml-2">(포인트: ${bonusPoint})</span></div>
    </div>
    `;
  };

  state.subscribe("cartList", render);

  render();

  return container;
}

export default CartTotal;
