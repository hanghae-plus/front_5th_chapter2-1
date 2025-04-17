import { CartItem } from '@/entities/cart';

export const DISCOUNT_RATES: Record<CartItem['id'], number> = {
	p1: 0.1,
	p2: 0.15,
	p3: 0.2,
	p4: 0.05,
	p5: 0.25,
};

export const MINIMUM_QUANTITY_FOR_DISCOUNT = 10;
export const BULK_PURCHASE_THRESHOLD = 30;
export const BULK_DISCOUNT_RATE = 0.25;
export const TUESDAY_DISCOUNT_RATE = 0.1;
export const TUESDAY_DAY_NUMBER = 2;
