export const useCalcCart = () => {
  totalAmount = 0;
  itemCount = 0;
  let cartItems = cartContainer.children;
  let subTotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    (() => {
      let currentItem;
      for (let j = 0; j < productList.length; j++) {
        if (productList[j].id === cartItems[i].id) {
          currentItem = productList[j];
          break;
        }
      }
      let quantity = parseInt(cartItems[i].querySelector("span").textContent.split("x ")[1]);
      let itemTotal = currentItem.price * quantity;
      let discount = 0;
      itemCount += quantity;
      subTotal += itemTotal;
      if (quantity >= 10) {
        if (currentItem.id === "p1") discount = 0.1;
        else if (currentItem.id === "p2") discount = 0.15;
        else if (currentItem.id === "p3") discount = 0.2;
        else if (currentItem.id === "p4") discount = 0.05;
        else if (currentItem.id === "p5") discount = 0.25;
      }
      totalAmount += itemTotal * (1 - discount);
    })();
  }
  let discRate = 0;
  if (itemCount >= 30) {
    let bulkDisc = totalAmount * 0.25;
    let itemDisc = subTotal - totalAmount;
    if (bulkDisc > itemDisc) {
      totalAmount = subTotal * (1 - 0.25);
      discRate = 0.25;
    } else {
      discRate = (subTotal - totalAmount) / subTotal;
    }
  } else {
    discRate = (subTotal - totalAmount) / subTotal;
  }
  if (new Date().getDay() === 2) {
    totalAmount *= 1 - 0.1;
    discRate = Math.max(discRate, 0.1);
  }
  totalPrice.textContent = "총액: " + Math.round(totalAmount) + "원";
  if (discRate > 0) {
    let span = document.createElement("span");
    span.className = "text-green-500 ml-2";
    span.textContent = "(" + (discRate * 100).toFixed(1) + "% 할인 적용)";
    totalPrice.appendChild(span);
  }
  updateStockInfo();
  renderBonusPoints();
};
