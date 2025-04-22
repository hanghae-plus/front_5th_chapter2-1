import { CONSTANTS } from '../constants/constant';
import ERROR_MESSAGES from '../constants/errorMessages';
import { state } from '../state';
import { updateSelOpts } from '../ui/render';

export function initializeSaleSystem() {
  setupFlashSale();
  setupSuggestions();
}

function setupFlashSale() {
  const delay = Math.random() * CONSTANTS.FLASH_SALE.MAX_DELAY;

  setTimeout(() => {
    setInterval(() => {
      try {
        runFlashSale();
      } catch (error) {
        console.error(ERROR_MESSAGES.SALE_SYSTEM.FLASH_SALE_ERROR, error);
      }
    }, CONSTANTS.FLASH_SALE.INTERVAL);
  }, delay);
}

function runFlashSale() {
  if (!state.productList || state.productList.length === 0) {
    console.warn(ERROR_MESSAGES.SALE_SYSTEM.NO_PRODUCTS);
    return;
  }
  const luckyItem =
    state.productList[Math.floor(Math.random() * state.productList.length)];
  if (Math.random() < CONSTANTS.FLASH_SALE.CHANCE && luckyItem.count > 0) {
    luckyItem.price = Math.round(
      luckyItem.price * CONSTANTS.SUGGESTION.DISCOUNT_RATE,
    );
    alert(`번개세일! ' ${luckyItem.name} 이(가) 20% 할인 중입니다!`);
    updateSelOpts();
  }
}

function setupSuggestions() {
  const delay = Math.random() * CONSTANTS.SUGGESTION.MAX_DELAY;

  setTimeout(() => {
    setInterval(() => {
      try {
        runSuggestion();
      } catch (error) {
        console.error(ERROR_MESSAGES.SALE_SYSTEM.SUGGESTION_ERROR, error);
      }
    }, CONSTANTS.SUGGESTION.INTERVAL);
  }, delay);
}

function runSuggestion() {
  if (!state.selected || !state.productList || state.productList.length === 0) {
    console.warn(ERROR_MESSAGES.SALE_SYSTEM.NO_PRODUCTS);
    return;
  }

  const suggest = state.productList.find(
    (item) => item.id !== state.selected && item.count > 0,
  );
  if (suggest) {
    alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
    suggest.price = Math.round(
      suggest.price * CONSTANTS.SUGGESTION.DISCOUNT_RATE,
    );
    updateSelOpts();
  }
}

//일반 할인 계산
export function applyBulkDiscount(subTotal, totalAmount) {
  if (state.currentItemCount < CONSTANTS.CART.BULK_DISCOUNT_ITEM_COUNT)
    return {
      finalAmount: totalAmount,
      discountRate: (subTotal - totalAmount) / subTotal,
    };

  const bulkDiscountAmt = subTotal * CONSTANTS.CART.BULK_DISCOUNT_RATE;
  const itemDiscountAmt = subTotal - totalAmount;

  if (bulkDiscountAmt > itemDiscountAmt) {
    return {
      finalAmount: subTotal * (1 - CONSTANTS.CART.BULK_DISCOUNT_RATE),
      discountRate: CONSTANTS.CART.BULK_DISCOUNT_RATE,
    };
  }
  return { finalAmount: totalAmount, discountRate: itemDiscountAmt / subTotal };
}

//화요일 할인 계산
export function applyTuesdayDiscount(totalAmount, currentDiscountRate) {
  const isTuesday = new Date().getDay() === 2;
  if (!isTuesday)
    return { finalAmount: totalAmount, discountRate: currentDiscountRate };

  return {
    finalAmount: totalAmount * CONSTANTS.FRIDAY_SALE.DISCOUNT_RATE,
    discountRate: Math.max(
      currentDiscountRate,
      1 - CONSTANTS.FRIDAY_SALE.DISCOUNT_RATE,
    ),
  };
}
