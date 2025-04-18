import { createElement } from '../utils/elementUtils';
import { productStore, cartStore } from '../store';
import { cartItems } from './CartItems';
import { getProductDiscountRate } from '../utils';

export const cartTotal = {
  $element: null,
  render() {
    const cartTotalElement = createElement('div', {
      id: 'cart-total',
      className: 'text-xl font-bold my-4',
    });

    this.$element = cartTotalElement;

    return this.$element;
  },
  getElement() {
    return this.$element;
  },
  updateCartTotal() {
    this.$element.textContent = `총액: ${cartStore.getState().totalPrice}원`;
  },
  updateCartDiscount() {
    const discountRate = cartStore.getDiscountRate();
    const discountedRate = (discountRate * 100).toFixed(1);

    const discountElement = createElement('span', {
      className: 'text-green-500 ml-2',
      textContent: `(${discountedRate}% 할인 적용)`,
    });

    this.$element.appendChild(discountElement);
  },
  updateCartPoint() {
    const point = Math.floor(cartStore.getState().totalPrice / 1000);

    let pointElement = document.getElementById('loyalty-points');
    if (!pointElement) {
      pointElement = createElement('span', {
        id: 'loyalty-points',
        className: 'text-blue-500 ml-2',
      });

      this.$element.appendChild(pointElement);
    }

    pointElement.textContent = `(포인트: ${point})`;
  },
  calculateCartTotal() {
    const products = productStore.getProducts();

    let cartItemsChildrenElement = cartItems.getElement().children;

    for (let i = 0; i < cartItemsChildrenElement.length; i++) {
      let currentProduct;

      for (let j = 0; j < products.length; j++) {
        const isSelectedSameProduct =
          products[j].id === cartItemsChildrenElement[i].id;

        if (isSelectedSameProduct) {
          currentProduct = products[j];
          break;
        }
      }

      let quantity = parseInt(
        cartItemsChildrenElement[i]
          .querySelector('span')
          .textContent.split('x ')[1],
      );
      let itemTotalPrice = currentProduct.price * quantity;
      let discountRate = 0;

      const isDiscount = quantity >= 10;
      if (isDiscount) {
        discountRate = getProductDiscountRate(currentProduct.id);
      }

      cartStore.setState({
        itemQuantity: cartStore.getState().itemQuantity + quantity,
        subTotalPrice: cartStore.getState().subTotalPrice + itemTotalPrice,
        totalPrice:
          cartStore.getState().totalPrice + itemTotalPrice * (1 - discountRate),
      });
    }
  },
};
