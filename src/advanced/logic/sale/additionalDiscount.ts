import { ADDITIONAL_DISCOUNT } from '@/basic/consts';
import { alertSuggestedProduct } from '@/advanced/utils';
import type { Product } from '@/advanced/types';

const getSuggestedProduct = (products: Product[], lastId: string | null): Product | undefined => {
  return products.find((item) => item.id !== lastId && item.quantity > 0);
};

interface AdditionalDiscountParams {
  selectedProductId: string | null;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const additionalDiscount = ({ selectedProductId, products, setProducts }: AdditionalDiscountParams): void => {
  if (!selectedProductId) return;

  const suggest = getSuggestedProduct(products, selectedProductId);
  if (!suggest) return;

  alertSuggestedProduct(suggest);
  
  const discountedValue = Math.round(suggest.value * (1 - ADDITIONAL_DISCOUNT.RATE));
  
  setProducts(currentProducts => 
    currentProducts.map(product => 
      product.id === suggest.id 
        ? { ...product, value: discountedValue }
        : product
    )
  );
};