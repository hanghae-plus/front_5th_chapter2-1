import { Product } from '@/entities/product';
import { createContext } from 'react';

export interface ProductContextStore {
	products: Product[];
	selectedProductId: string;

	setSelectedProductId: (id: string) => void;
	updateProducts: (updater: (prevProducts: Product[]) => Product[]) => void;
}

export const ProductContextStore = createContext<
	ProductContextStore | undefined
>(undefined);
