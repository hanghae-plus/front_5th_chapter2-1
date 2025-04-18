import {
  getCartItemElementById,
  addNewCartItemElement,
  updateCartItemElement,
  updateCartTotalElement,
  updateStockStatusElement,
} from '../dom-helpers';
import {
  QUANTITY_DISCOUNT_RATE,
  BULK_DISCOUNT_RATE,
  BULK_DISCOUNT_THRESHOLD,
  TUESDAY_DISCOUNT_RATE,
} from '../constants';

export const createCartService = (store, productService) => {
  const getCartItemById = productId => {
    return store.cart.find(item => item.id === productId);
  };

  const incrementCartItemQuantity = productId => {
    const product = productService.getProductById(productId);
    const cartItem = getCartItemById(productId);
    const cartItemElement = getCartItemElementById(productId);
    const newQuantity = cartItem.quantity + 1;

    if (!product || product.quantity <= newQuantity) {
      alert('재고가 부족합니다.');
      return false;
    }

    updateCartItemElement(cartItemElement, product, newQuantity);

    cartItem.quantity += 1;
    cartItem.price += product.price;
    product.quantity -= 1;
    return true;
  };

  const addNewCartItem = productId => {
    const product = productService.getProductById(productId);

    addNewCartItemElement(product);
    store.cart.push({ id: productId, quantity: 1, price: product.price });
    product.quantity -= 1;

    return true;
  };

  const addCartItem = productId => {
    const cartItem = getCartItemById(productId);

    if (!cartItem) {
      addNewCartItem(productId);
    } else {
      incrementCartItemQuantity(productId);
    }

    updateCartInfo();
  };

  const hasEnoughStock = (productQuantity, change) => {
    if (change < 0) {
      return true;
    }

    return change <= productQuantity;
  };

  const updateCartItem = (change, productId) => {
    const product = productService.getProductById(productId);
    const cartItem = getCartItemById(productId);
    const cartItemElement = getCartItemElementById(productId);
    const quantity = cartItem.quantity;
    const newQuantity = quantity + change;

    if (!hasEnoughStock(product.quantity, change)) {
      alert('재고가 부족합니다.');
      return;
    }

    if (newQuantity <= 0) {
      store.cart = store.cart.filter(item => item.id !== productId);
      product.quantity -= change;
      cartItemElement.remove();
    } else {
      updateCartItemElement(cartItemElement, product, newQuantity);
      product.quantity -= change;
      cartItem.quantity += change;
      cartItem.price += product.price;
    }

    updateCartInfo();
  };

  const removeCartItem = productId => {
    const product = productService.getProductById(productId);
    const cartItem = getCartItemById(productId);
    const cartItemElement = getCartItemElementById(productId);
    const quantity = cartItem.quantity;

    store.cart = store.cart.filter(item => item.id !== productId);
    product.quantity += quantity;

    cartItemElement.remove();
    updateCartInfo();
  };

  const updateCartInfo = () => {
    const cartInfo = getCartInfo();

    store.totalAmount = cartInfo.totalAmount;
    store.itemCount = cartInfo.itemCount;
    store.discountRate = cartInfo.discountRate;

    updateCartTotal(store.totalAmount, store.discountRate);

    updateStockStatusElement(store.products);
  };

  const getCartInfo = () => {
    let { totalAmount, itemCount, tempTotalAmount } = store.cart.reduce(
      (acc, cartItem) => {
        const { quantity, price, id } = cartItem;
        const quantityDiscount = quantity >= 10 ? QUANTITY_DISCOUNT_RATE[id] || 0 : 0;

        return {
          totalAmount: acc.totalAmount + price * (1 - quantityDiscount),
          itemCount: acc.itemCount + quantity,
          tempTotalAmount: acc.tempTotalAmount + price,
        };
      },
      { totalAmount: 0, itemCount: 0, tempTotalAmount: 0 }
    );

    let discountRate = 0;
    if (itemCount >= BULK_DISCOUNT_THRESHOLD) {
      const bulkDiscount = totalAmount * BULK_DISCOUNT_RATE;
      const itemDiscount = tempTotalAmount - totalAmount;

      if (bulkDiscount > itemDiscount) {
        totalAmount = tempTotalAmount * (1 - BULK_DISCOUNT_RATE);
        discountRate = BULK_DISCOUNT_RATE;
      }

      if (itemDiscount <= bulkDiscount) {
        discountRate = (tempTotalAmount - totalAmount) / tempTotalAmount;
      }
    }

    if (itemCount < BULK_DISCOUNT_THRESHOLD) {
      discountRate = (tempTotalAmount - totalAmount) / tempTotalAmount;
    }

    if (new Date().getDay() === 2) {
      totalAmount *= 1 - TUESDAY_DISCOUNT_RATE;
      discountRate = Math.max(discountRate, TUESDAY_DISCOUNT_RATE);
    }

    return {
      totalAmount: Math.round(totalAmount),
      itemCount,
      discountRate,
    };
  };

  const updateCartTotal = (totalAmount, discountRate) => {
    updateCartTotalElement(totalAmount, discountRate);
  };

  return {
    getCartItemById,
    addCartItem,
    updateCartItem,
    removeCartItem,
  };
};
