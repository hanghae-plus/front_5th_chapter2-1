import { ADDITIONAL_DISCOUNT } from '@/basic/consts';
import { alertSuggestedProduct } from '@/advanced/utils';
import type { Product } from '@/advanced/types';

const getSuggestedProduct = (products: Product[], lastId: string | null): Product | undefined => {
  return products.find((item) => item.id !== lastId && item.quantity > 0);
};

interface AdditionalDiscountParams {
  selectedProductId: string | null;
  productList: Product[];
  setProductList: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const additionalDiscount = ({ selectedProductId, productList, setProductList }: AdditionalDiscountParams): void => {
  if (!selectedProductId) return;

  const suggest = getSuggestedProduct(productList, selectedProductId);
  if (!suggest) return;

  alertSuggestedProduct(suggest);
  
  const discountedValue = Math.round(suggest.value * (1 - ADDITIONAL_DISCOUNT.RATE));
  
  setProductList(currentProductList => 
    currentProductList.map(product => 
      product.id === suggest.id 
        ? { ...product, value: discountedValue }
        : product
    )
  );
};