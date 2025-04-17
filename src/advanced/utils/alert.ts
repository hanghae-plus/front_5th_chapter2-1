import type { Product } from "@/advanced/types";
import {
  alertFlashSale as basicAlertFlashSale,
  alertSuggestedProduct as basicAlertSuggestedProduct,
  alertOutOfStock as basicAlertOutOfStock
} from "@/basic/utils/alert";
import { FLASH_SALE } from "@/basic/consts";

export const alertFlashSale = (item: Product, rate: number = FLASH_SALE.DISCOUNT_RATE): void => {
  basicAlertFlashSale(item, rate);
};

export const alertSuggestedProduct = (item: Product): void => {
  basicAlertSuggestedProduct(item);
};

export const alertOutOfStock = (): void => {
  basicAlertOutOfStock();
};