import {
  formatPrice as basicFormatPrice,
  formatDiscountRate as basicFormatDiscountRate,
  formatProductOption as basicFormatProductOption,
  formatStockStatusMessage as basicFormatStockStatusMessage,
} from "@/basic/utils/format";
import type { Product } from "@/advanced/types";

export const formatPrice = (price: number): string => {
  return basicFormatPrice(price);
};

export const formatDiscountRate = (rate: number): string => {
  return basicFormatDiscountRate(rate);
};

export const formatProductOption = (item: Product): string => {
  return basicFormatProductOption(item);
};

export const formatStockStatusMessage = (item: Product): string => {
  return basicFormatStockStatusMessage(item);
};
