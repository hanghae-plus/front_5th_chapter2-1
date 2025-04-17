import { BONUS_POINT_RATE, DISCOUNT_RATES, DISCOUNT_RATES_BY_PRODUCT } from "@advanced/lib/configs/__mocks__";
import { type CartAction, cartReducer } from "@advanced/lib/reducers/cartReducer";
import type { CartItem, CartState } from "@advanced/lib/types";
import { generateCartInvoice } from "@advanced/lib/utils/cartUtils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@advanced/lib/configs");
describe("cart invoice integration test", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-04-16"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("상품1 > 10개 구매 시 10% 할인", () => {
    const items: CartItem[] = [{ id: "p1", name: "상품1", price: 100, quantity: 11, stock: 100 }];
    const invoice = generateCartInvoice(items);
    const before = 11 * 100;

    expect(invoice.totalQuantity).toBe(11);
    expect(invoice.totalAmountBeforeDiscount).toBe(before);
    expect(invoice.discountRate).toBe(0.1);
    expect(invoice.totalAmount).toBe(before * (1 - DISCOUNT_RATES_BY_PRODUCT.p1));
    expect(invoice.bonusPoints).toBe(Math.floor(invoice.totalAmount * BONUS_POINT_RATE));
  });

  it("상품2 > 10개 구매 시 15% 할인", () => {
    const items: CartItem[] = [{ id: "p2", name: "상품2", price: 200, quantity: 12, stock: 100 }];
    const invoice = generateCartInvoice(items);
    const before = 12 * 200;

    expect(invoice.totalQuantity).toBe(12);
    expect(invoice.discountRate).toBe(0.15);
    expect(invoice.totalAmount).toBe(before * (1 - DISCOUNT_RATES_BY_PRODUCT.p2));
    expect(invoice.bonusPoints).toBe(Math.floor(invoice.totalAmount * BONUS_POINT_RATE));
  });

  it("상품3 > 10개 구매 시 20% 할인", () => {
    const items: CartItem[] = [{ id: "p3", name: "상품3", price: 300, quantity: 15, stock: 100 }];
    const invoice = generateCartInvoice(items);
    const before = 15 * 300;

    expect(invoice.totalQuantity).toBe(15);
    expect(invoice.discountRate).toBe(0.2);
    expect(invoice.totalAmount).toBe(before * (1 - DISCOUNT_RATES_BY_PRODUCT.p3));
    expect(invoice.bonusPoints).toBe(Math.floor(invoice.totalAmount * BONUS_POINT_RATE));
  });

  it("전체 수량 30개 이상 구매 시 25% 할인 (상품 종류 무관)", () => {
    const items: CartItem[] = [
      { id: "p1", name: "상품1", price: 100, quantity: 10, stock: 100 },
      { id: "p2", name: "상품2", price: 200, quantity: 10, stock: 100 },
      { id: "p3", name: "상품3", price: 300, quantity: 10, stock: 100 },
    ];
    const invoice = generateCartInvoice(items);
    const before = 10 * 100 + 10 * 200 + 10 * 300;

    expect(invoice.totalQuantity).toBe(30);
    expect(invoice.discountRate).toBe(DISCOUNT_RATES.bulk);
    expect(invoice.totalAmount).toBe(before * (1 - DISCOUNT_RATES.bulk));
  });

  it("화요일 특별 할인 10%", () => {
    vi.setSystemTime(new Date("2025-04-15"));

    const items: CartItem[] = [
      { id: "p1", name: "상품1", price: 100, quantity: 5, stock: 100 },
      { id: "p2", name: "상품2", price: 200, quantity: 5, stock: 100 },
    ];
    const invoice = generateCartInvoice(items);
    const before = 5 * 100 + 5 * 200;

    expect(invoice.totalQuantity).toBe(10);
    expect(invoice.discountRate).toBe(DISCOUNT_RATES.tuesday);
    expect(invoice.totalAmount).toBe(before * (1 - DISCOUNT_RATES.tuesday));
  });
});

describe("cart reducer integration test", () => {
  it("상품 추가", () => {
    const state: CartState = {
      addedItems: [],
      lastSelected: "",
      totalQuantity: 0,
      totalAmountBeforeDiscount: 0,
      totalAmount: 0,
      discountRate: 0,
      bonusPoints: 0,
    };

    const action: CartAction = {
      type: "ADD_TO_CART",
      payload: { id: "p1", name: "상품1", price: 100, stock: 100 },
    };

    const newState = cartReducer(state, action);

    expect(newState.addedItems).toEqual([{ id: "p1", name: "상품1", price: 100, quantity: 1, stock: 100 }]);
    expect(newState.totalQuantity).toBe(1);
    expect(newState.totalAmountBeforeDiscount).toBe(100);
    expect(newState.totalAmount).toBe(100);
    expect(newState.discountRate).toBe(0);
    expect(newState.bonusPoints).toBe(Math.floor(newState.totalAmount * BONUS_POINT_RATE));
  });

  it("상품 수량 변경 +1", () => {
    const state: CartState = {
      addedItems: [{ id: "p1", name: "상품1", price: 100, quantity: 1, stock: 100 }],
      lastSelected: "p1",
      totalQuantity: 1,
      totalAmountBeforeDiscount: 100,
      totalAmount: 100,
      discountRate: 0,
      bonusPoints: 0,
    };

    const action: CartAction = {
      type: "CHANGE_QUANTITY",
      payload: { id: "p1", name: "상품1", price: 100, quantity: 2, stock: 100, change: 1 },
    };

    const newState = cartReducer(state, action);

    expect(newState.addedItems).toEqual([{ id: "p1", name: "상품1", price: 100, quantity: 3, stock: 100 }]);
    expect(newState.totalQuantity).toBe(3);
    expect(newState.totalAmountBeforeDiscount).toBe(300);
    expect(newState.totalAmount).toBe(300);
    expect(newState.discountRate).toBe(0);
    expect(newState.bonusPoints).toBe(Math.floor(newState.totalAmount * BONUS_POINT_RATE));
  });

  it("상품 수량 변경 -1", () => {
    const state: CartState = {
      addedItems: [{ id: "p1", name: "상품1", price: 100, quantity: 3, stock: 100 }],
      lastSelected: "p1",
      totalQuantity: 3,
      totalAmountBeforeDiscount: 300,
      totalAmount: 300,
      discountRate: 0,
      bonusPoints: 0,
    };

    const action: CartAction = {
      type: "CHANGE_QUANTITY",

      payload: { id: "p1", name: "상품1", price: 100, quantity: 2, stock: 100, change: -1 },
    };

    const newState = cartReducer(state, action);

    expect(newState.addedItems).toEqual([{ id: "p1", name: "상품1", price: 100, quantity: 1, stock: 100 }]);
    expect(newState.totalQuantity).toBe(1);
    expect(newState.totalAmountBeforeDiscount).toBe(100);
    expect(newState.totalAmount).toBe(100);
    expect(newState.discountRate).toBe(0);
    expect(newState.bonusPoints).toBe(Math.floor(newState.totalAmount * BONUS_POINT_RATE));
  });

  it("상품 삭제", () => {
    const state: CartState = {
      addedItems: [{ id: "p1", name: "상품1", price: 100, quantity: 1, stock: 100 }],
      lastSelected: "p1",
      totalQuantity: 1,
      totalAmountBeforeDiscount: 100,
      totalAmount: 100,
      discountRate: 0,
      bonusPoints: 0,
    };

    const action: CartAction = {
      type: "REMOVE_FROM_CART",
      payload: { id: "p1", name: "상품1", price: 100, quantity: 1, stock: 100 },
    };

    const newState = cartReducer(state, action);

    expect(newState.addedItems).toEqual([]);
    expect(newState.totalQuantity).toBe(0);
    expect(newState.totalAmountBeforeDiscount).toBe(0);
    expect(newState.totalAmount).toBe(0);
    expect(newState.discountRate).toBe(0);
    expect(newState.bonusPoints).toBe(0);
  });
});
