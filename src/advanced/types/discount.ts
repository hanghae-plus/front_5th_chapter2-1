export interface ProductDiscountPolicy {
  RATES: Record<string, number>;
  MIN_QUANTITY: number;
}

export interface CartDiscountPolicy {
  BULK_THRESHOLD: number;
  BULK_RATE: number;
}

export interface TuesdayDiscountPolicy {
  RATE: number;
}

export interface DiscountPolicies {
  PRODUCT: ProductDiscountPolicy;
  CART: CartDiscountPolicy;
  TUESDAY: TuesdayDiscountPolicy;
}

export interface TuesdayDiscountResult {
  price: number;
  discountRate: number;
}
