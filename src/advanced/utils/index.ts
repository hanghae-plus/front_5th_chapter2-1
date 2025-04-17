import { DISCOUNT, STOCK } from '../constants';

export const isOutOfStock = (stock?: number): boolean => !stock || stock <= STOCK.OUT;
export const isShortageOfStock = (stock: number): boolean => stock < STOCK.SHORTAGE;

export const getDiscountedPrice = (price: number, discountRate: number, shouldRound?: boolean): number =>
  shouldRound ? Math.round(price * (1 - discountRate)) : price * (1 - discountRate);

export const isTuesday = (): boolean => new Date().getDay() === DISCOUNT.TUESDAY.CODE;
