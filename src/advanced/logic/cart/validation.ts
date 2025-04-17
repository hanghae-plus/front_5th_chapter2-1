import { alertOutOfStock } from '@/advanced/utils';

export const canChangeQuantity = (
  currentQuantity: number, 
  change: number, 
  stockQuantity: number
): boolean => {
  const newQuantity = currentQuantity + change;
  const maxAllowed = stockQuantity + currentQuantity;

  if (newQuantity <= 0) return false;
  if (newQuantity > maxAllowed) {
    alertOutOfStock();
    return false;
  }
  return true;
};