
const findProductById = (id, productList) => {
  return productList.find(product => product.id === id);
}


const getDiscountRate = (currentItemId, quantity) => {
  if (quantity < 10) return 0;

  const discountMap = {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.05,
    p5: 0.25,
  };

  return discountMap[currentItemId] || 0;
}


export const calculateCartTotals = (cartItems, prodList) => {
  let subTotal = 0;
  let itemCount = 0;
  let totalAmount = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];

    const currentItem = findProductById(cartItem.id, prodList);
    if (!currentItem) continue;

    const quantity = parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);
    const itemTotal = currentItem.val * quantity;
    const discountRate = getDiscountRate(currentItem.id, quantity);

    itemCount += quantity;
    subTotal += itemTotal;
    totalAmount += itemTotal * (1 - discountRate);
  }

  return { subTotal, itemCount, totalAmount };
}