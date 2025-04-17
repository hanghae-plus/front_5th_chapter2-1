import { FLASH_SALE } from "@/basic/consts";
import { alertFlashSale } from "@/advanced/utils";
import type { Product } from "@/advanced/types";

const getRandomProduct = (productList: Product[]): Product => {
  return productList[Math.floor(Math.random() * productList.length)];
};

const isEligibleForFlashSale = (item: Product): boolean => {
  return Math.random() < 0.3 && item.quantity > 0;
};

interface FlashSaleParams {
  productList: Product[];
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const flashSale = ({ productList, setProductList }: FlashSaleParams): void => {
  const eligibleProducts = productList.filter((product) => product.quantity > 0 && isEligibleForFlashSale(product));

  const selectedProduct = getRandomProduct(eligibleProducts);
  if (!selectedProduct) return;

  setProductList((prev) =>
    prev.map((product) =>
      product.id === selectedProduct.id
        ? {
            ...product,
            value: Math.floor(product.value * (1 - FLASH_SALE.DISCOUNT_RATE)),
          }
        : product,
    ),
  );
  alertFlashSale(selectedProduct);
};
