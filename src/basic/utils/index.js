import { DISCOUNT, STOCK } from '../constants';

export const isOutOfStock = (stock) => stock <= STOCK.OUT;
export const isShortageOfStock = (stock) => stock < STOCK.SHORTAGE;

export const getDiscountedPrice = (price, discountRate, shouldRound = false) =>
  shouldRound ? Math.round(price * (1 - discountRate)) : price * (1 - discountRate);

export const isTuesday = () => new Date().getDay() === DISCOUNT.TUESDAY.CODE;
