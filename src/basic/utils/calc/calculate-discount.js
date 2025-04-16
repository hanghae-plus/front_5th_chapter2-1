
export const calculateDiscount = (itemCount,totalAmount,subTotal) => {
  let discountRate = 0;

  if(itemCount >= 30){
    const bulkDiscount = totalAmount * 0.25;
    const itemDiscount = subTotal - totalAmount;

    if(bulkDiscount > itemDiscount){
      totalAmount = subTotal - totalAmount;
      discountRate = 0.25
    } else {
      discountRate = (subTotal - totalAmount) / subTotal;
    }
  } else {
    discountRate = (subTotal - totalAmount) / subTotal;  }

  if(new Date().getDay() === 2) {
    totalAmount *= (1 - 0.1);
    discountRate=Math.max(discountRate, 0.1);
  }

return { discountRate }

}