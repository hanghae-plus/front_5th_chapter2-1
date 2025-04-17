import { useCallback } from 'react';
import { useProduct } from '@/advanced/context';
import { formatProductOption } from '@/advanced/utils';
import type { Product } from '@/advanced/types';

interface ProductOption {
  id: string;
  label: string;
  disabled: boolean;
}

interface UseProductSelectReturn {
  options: ProductOption[];
  handleSelectChange: (value: string) => void;
  selectedProductId: string;
}

export const useProductSelect = (): UseProductSelectReturn => {
  const { productList, setSelectedProductId, selectedProductId } = useProduct();

  const options = productList.map((item: Product) => ({
    id: item.id,
    label: formatProductOption(item),
    disabled: item.quantity === 0
  }));

  const handleSelectChange = useCallback((value: string) => {
    setSelectedProductId(value);
  }, [setSelectedProductId]);

  return {
    options,
    handleSelectChange,
    selectedProductId
  };
};