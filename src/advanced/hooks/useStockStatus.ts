import { useMemo } from 'react';
import { useProduct } from '@/advanced/context';
import { formatStockStatusMessage } from '@/advanced/utils';
import type { Product } from '@/advanced/types';

interface UseStockStatusReturn {
  stockMessage: string;
  lowStockItems: Product[];
  outOfStockItems: Product[];
}

export const useStockStatus = (): UseStockStatusReturn => {
  const { productList } = useProduct();

  return useMemo(() => {
    const lowStockItems = productList.filter(item => item.quantity > 0 && item.quantity < 5);
    const outOfStockItems = productList.filter(item => item.quantity === 0);

    const stockMessage = productList.reduce((acc, item) => 
      acc + formatStockStatusMessage(item)
    , '');

    return {
      stockMessage,
      lowStockItems,
      outOfStockItems
    };
  }, [productList]);
};