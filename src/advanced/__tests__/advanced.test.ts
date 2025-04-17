import { BONUS_POINT_RATE, DISCOUNT_RATES, DISCOUNT_RATES_BY_PRODUCT } from "@advanced/lib/configs/__mocks__";
import { type CartAction, cartReducer } from "@advanced/lib/reducers/cartReducer";
import type { CartItem, CartState } from "@advanced/lib/types";
import { generateCartInvoice } from "@advanced/lib/utils/cartUtils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@advanced/lib/configs");

const invoiceTestCases = [
  {
    name: "상품1 > 10개 구매 시 10% 할인",
    date: "2025-04-16",
    items: [{ id: "p1", name: "상품1", price: 100, quantity: 11, stock: 100 }],
    expected: { totalQuantity: 11, discountRate: DISCOUNT_RATES_BY_PRODUCT.p1 },
  },
  {
    name: "상품2 > 10개 구매 시 15% 할인",
    date: "2025-04-16",
    items: [{ id: "p2", name: "상품2", price: 200, quantity: 12, stock: 100 }],
    expected: { totalQuantity: 12, discountRate: DISCOUNT_RATES_BY_PRODUCT.p2 },
  },
  {
    name: "상품3 > 10개 구매 시 20% 할인",
    date: "2025-04-16",
    items: [{ id: "p3", name: "상품3", price: 300, quantity: 15, stock: 100 }],
    expected: { totalQuantity: 15, discountRate: DISCOUNT_RATES_BY_PRODUCT.p3 },
  },
  {
    name: "전체 수량 30개 이상 구매 시 25% 할인 (상품 종류 무관)",
    date: "2025-04-16",
    items: [
      { id: "p1", name: "상품1", price: 100, quantity: 10, stock: 100 },
      { id: "p2", name: "상품2", price: 200, quantity: 10, stock: 100 },
      { id: "p3", name: "상품3", price: 300, quantity: 10, stock: 100 },
    ],
    expected: { totalQuantity: 30, discountRate: DISCOUNT_RATES.bulk },
  },
  {
    name: "화요일 특별 할인 10%",
    date: "2025-04-15",
    items: [
      { id: "p1", name: "상품1", price: 100, quantity: 5, stock: 100 },
      { id: "p2", name: "상품2", price: 200, quantity: 5, stock: 100 },
    ],
    expected: { totalQuantity: 10, discountRate: DISCOUNT_RATES.tuesday },
  },
];

describe("cart invoice가 정확한 값을 반환해야 한다", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it.each(invoiceTestCases)("$name", ({ date, items, expected }) => {
    vi.setSystemTime(new Date(date));
    const before = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const invoice = generateCartInvoice(items);

    expect(invoice.totalQuantity).toBe(expected.totalQuantity);
    expect(invoice.totalAmountBeforeDiscount).toBe(before);
    expect(invoice.discountRate).toBe(expected.discountRate);
    expect(invoice.totalAmount).toBe(before * (1 - expected.discountRate));
    expect(invoice.bonusPoints).toBe(Math.floor(invoice.totalAmount * BONUS_POINT_RATE));
  });
});

const cartReducerTestCases: Array<{
  name: string;
  initialItems: CartItem[];
  action: CartAction;
  expected: Partial<CartState>;
}> = [
  {
    name: "상품 추가",
    initialItems: [],
    action: {
      type: "ADD_TO_CART",
      payload: { id: "p1", name: "상품1", price: 100, stock: 100 },
    },
    expected: {
      addedItems: [{ id: "p1", name: "상품1", price: 100, quantity: 1, stock: 100 }],
      totalQuantity: 1,
      totalAmountBeforeDiscount: 100,
      totalAmount: 100,
      discountRate: 0,
    },
  },
  {
    name: "상품 수량 +1",
    initialItems: [{ id: "p1", name: "상품1", price: 100, quantity: 1, stock: 100 }],
    action: {
      type: "CHANGE_QUANTITY",
      payload: { id: "p1", name: "상품1", price: 100, quantity: 1, stock: 100, change: 1 },
    },
    expected: { totalQuantity: 2, totalAmount: 200 },
  },
  {
    name: "상품 수량 -1",
    initialItems: [{ id: "p1", name: "상품1", price: 100, quantity: 3, stock: 100 }],
    action: {
      type: "CHANGE_QUANTITY",
      payload: { id: "p1", name: "상품1", price: 100, quantity: 3, stock: 100, change: -1 },
    },
    expected: { totalQuantity: 2, totalAmount: 200 },
  },
  {
    name: "상품 삭제",
    initialItems: [{ id: "p1", name: "상품1", price: 100, quantity: 1, stock: 100 }],
    action: {
      type: "REMOVE_FROM_CART",
      payload: { id: "p1", name: "상품1", price: 100, quantity: 1, stock: 100 },
    },
    expected: { totalQuantity: 0, totalAmount: 0, addedItems: [] },
  },
];

describe("cartReducer가 action에 따라 올바른 state를 반환해야 한다", () => {
  const baseState: CartState = {
    addedItems: [],
    lastSelected: "",
    totalQuantity: 0,
    totalAmountBeforeDiscount: 0,
    totalAmount: 0,
    discountRate: 0,
    bonusPoints: 0,
  };

  const applyAction = (initial: CartState, action: CartAction): CartState => {
    return cartReducer(initial, action);
  };

  it.each(cartReducerTestCases)("$name", ({ initialItems, action, expected }) => {
    const state: CartState = { ...baseState, addedItems: initialItems };
    const result = applyAction(state, action);

    for (const [key, val] of Object.entries(expected)) {
      expect(result[key as keyof CartState]).toEqual(val);
    }
  });
});
