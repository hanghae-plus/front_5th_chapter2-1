import {
  calculateTotalPrice as basicCalculateTotalPrice,
  calculateDiscountedPrice as basicCalculateDiscountedPrice,
  calculateBonusPoints as basicCalculateBonusPoints,
} from "@/basic/utils/calculate";

export const calculateTotalPrice = (price: number, quantity: number): number => {
  return basicCalculateTotalPrice(price, quantity);
};

export const calculateDiscountedPrice = (price: number, discountRate: number): number => {
  return basicCalculateDiscountedPrice(price, discountRate);
};

export const calculateBonusPoints = (amount: number): number => {
  return basicCalculateBonusPoints(amount);
};