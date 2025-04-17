import { ADDITIONAL_DISCOUNT } from '@/basic/consts';
import { alertSuggestedProduct } from '@/advanced/utils';
import type { Product } from '@/advanced/types';

const getSuggestedProduct = (productList: Product[], lastId: string | null): Product | undefined => {
  return productList.find((item) => item.id !== lastId && item.quantity > 0);
};

interface AdditionalDiscountParams {
  selectedProductId: string | null;
  productList: Product[];
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const additionalDiscount = ({ selectedProductId, productList, setProductList }: AdditionalDiscountParams): void => {
  if (!selectedProductId) return;

  const suggestedProduct = getSuggestedProduct(productList, selectedProductId);
  if (!suggestedProduct) return;

  alertSuggestedProduct(suggestedProduct);
  
  const discountedValue = Math.round(suggestedProduct.value * (1 - ADDITIONAL_DISCOUNT.RATE));
  
  setProductList(currentProductList => 
    currentProductList.map(product => 
      product.id === suggestedProduct.id 
        ? { ...product, value: discountedValue }
        : product
    )
  );
};