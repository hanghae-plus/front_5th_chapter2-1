import { CartItem } from '@/entities/cart';
import {
	BULK_DISCOUNT_RATE,
	BULK_PURCHASE_THRESHOLD,
	DISCOUNT_RATES,
	MINIMUM_QUANTITY_FOR_DISCOUNT,
	TUESDAY_DAY_NUMBER,
	TUESDAY_DISCOUNT_RATE,
} from '../constants';

export const calculateItemDiscount = (
	item: CartItem,
	quantity: number,
): number => {
	const isEligibleForDiscount = quantity >= MINIMUM_QUANTITY_FOR_DISCOUNT;
	return isEligibleForDiscount ? DISCOUNT_RATES[item.id] || 0 : 0;
};

const calculateDiscountedAmount = (
	amount: number,
	discountRate: number,
): number => {
	if (discountRate <= 0 || discountRate >= 1 || !isFinite(discountRate)) {
		return amount;
	}
	return Math.round(amount * (1 - discountRate));
};

const calculateTotalDiscountRate = (
	originalAmount: number,
	discountedAmount: number,
): number => {
	if (originalAmount <= 0 || discountedAmount > originalAmount) {
		return 0;
	}

	// * 할인율 = (원래금액 - 할인금액) / 원래금액
	return (originalAmount - discountedAmount) / originalAmount;
};

export const applyBulkQuantityDiscount = (
	itemCount: number,
	subTotal: number,
	discountedTotal: number,
): { discountedTotal: number; totalDiscountRate: number } => {
	const initialDiscountRate = calculateTotalDiscountRate(
		subTotal,
		discountedTotal,
	);
	const shouldApplyBulkDiscount = itemCount >= BULK_PURCHASE_THRESHOLD;

	if (!shouldApplyBulkDiscount) {
		return {
			discountedTotal,
			totalDiscountRate: initialDiscountRate,
		};
	}

	const bulkDiscountResult = {
		discountedTotal: calculateDiscountedAmount(subTotal, BULK_DISCOUNT_RATE),
		totalDiscountRate: BULK_DISCOUNT_RATE,
	};

	const currentDiscountResult = {
		discountedTotal,
		totalDiscountRate: initialDiscountRate,
	};

	const bulkDiscountAmount = subTotal - bulkDiscountResult.discountedTotal;
	const currentDiscountAmount =
		subTotal - currentDiscountResult.discountedTotal;

	return bulkDiscountAmount > currentDiscountAmount
		? bulkDiscountResult
		: currentDiscountResult;
};

const applyTuesdayDiscount = (discountedResult: {
	discountedTotal: number;
	totalDiscountRate: number;
}): { discountedTotal: number; totalDiscountRate: number } => {
	const isTuesday = new Date().getDay() === TUESDAY_DAY_NUMBER;

	if (!isTuesday) {
		return discountedResult;
	}

	// * 화요일에는 할인된 금액에 추가 10% 할인 적용 (복합 할인)
	const newDiscountedTotal = calculateDiscountedAmount(
		discountedResult.discountedTotal,
		TUESDAY_DISCOUNT_RATE,
	);

	// * 총 할인율은 기존 할인율과 화요일 할인을 합성
	// * (1 - 총할인율) = (1 - 기존할인율) * (1 - 화요일할인율)
	const combinedDiscountRate =
		1 - (1 - discountedResult.totalDiscountRate) * (1 - TUESDAY_DISCOUNT_RATE);

	return {
		discountedTotal: newDiscountedTotal,
		totalDiscountRate: combinedDiscountRate,
	};
};

export const applyBulkDiscount = (
	itemCount: number,
	subTotal: number,
	discountedTotal: number,
): { discountedTotal: number; totalDiscountRate: number } => {
	const bulkDiscountResult = applyBulkQuantityDiscount(
		itemCount,
		subTotal,
		discountedTotal,
	);
	return applyTuesdayDiscount(bulkDiscountResult);
};
