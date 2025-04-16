import { globalState } from "../state/globalState";
import type { GlobalState } from "../types";
import { handleAddButtonClick, handleCountChange } from "../utils";
import { CartList, ProductSelector, SoldOutList, TotalPrice } from "./cart";
import { Header } from "./common";

export function App() {
  const app = document.getElementById("app");
  const container = document.createElement("div");
  const wrapper = document.createElement("div");

  this.state = globalState;
  this.setState = (newState: GlobalState) => {
    const isChanged = JSON.stringify(this.state) !== JSON.stringify(newState);
    if (isChanged) {
      this.state = newState;
    }
    cartList.setState(this.state);
    totalPrice.setState(this.state);
    productSelector.setState(this.state);
    soldOutList.setState(this.state);
  };

  this.init = () => {
    container.className = "bg-gray-100 p-8";
    wrapper.className = "max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8";
    container.appendChild(wrapper);
    app?.appendChild(container);
  };

  new Header({ target: wrapper });
  const cartList = new CartList({
    target: wrapper,
    initialState: this.state,
    handleCountChange: (productId: string, change: number) => {
      const { updatedProductList, updatedCartList, newTotalPrice } = handleCountChange(productId, change, this.state);

      this.setState({
        productList: updatedProductList,
        cartList: updatedCartList,
        totalPrice: newTotalPrice,
      });
    },
    handleCartItemRemove: (productId: string) => {
      // 삭제될 항목(cartItem)을 찾습니다.
      const removedCartItem = this.state.cartList.find((item) => item.id === productId);
      if (!removedCartItem) return;

      // 상품 정보를 productList에서 찾습니다.
      const product = this.state.productList.find((item) => item.id === productId);
      if (!product) return;

      // cartList에서 해당 상품을 필터링하여 제거합니다.
      const updatedCartList = this.state.cartList.filter((item) => item.id !== productId);

      const newTotal = updatedCartList.reduce((acc: number, item) => acc + item.price * (item.count || 1), 0);

      // 제거된 상품의 count만큼 상품의 재고를 증가시킵니다.
      const updatedProductList = this.state.productList.map((item) =>
        item.id === productId ? { ...item, count: item.count + removedCartItem.count } : item,
      );

      this.setState({
        productList: updatedProductList,
        cartList: updatedCartList,
        totalPrice: newTotal,
      });
    },
  });
  const totalPrice = new TotalPrice({ target: wrapper, initialState: this.state });
  const productSelector = new ProductSelector({
    target: wrapper,
    initialState: this.state,
    handleButtonClick: (selectedProductId: string) => {
      const { updatedProductList, updatedCartList, newTotalPrice } = handleAddButtonClick(
        selectedProductId,
        this.state,
      );

      this.setState({
        productList: updatedProductList,
        cartList: updatedCartList,
        totalPrice: newTotalPrice,
      });
    },
  });
  const soldOutList = new SoldOutList({ target: wrapper, initialState: this.state });

  this.init();
}
