import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

import { getState, setState } from '../store';
import { initialProducts } from '../constants';
import { cartCalculate } from '../utils/cart-calculate';

// 테스트를 위한 스토어 초기화 함수
const initializeStore = () => {
  setState('products', JSON.parse(JSON.stringify(initialProducts)));
  setState('cartList', []);
  setState('totalAmount', 0);
  setState('discountRate', 0);
  setState('points', 0);
  setState('cartCount', 0);
  setState('lastSelected', null);
};

describe('advanced test', () => {
  // 각 테스트 전에 스토어 초기화
  beforeEach(() => {
    vi.useFakeTimers();
    initializeStore();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('장바구니 계산 기능 테스트', () => {
    // 상품을 장바구니에 추가할 때 총액이 올바르게 계산되는지 확인
    it('장바구니에 상품 추가 시 총액이 올바르게 계산된다', () => {
      // 장바구니에 상품 추가
      const product = getState().products[0]; // 상품1: 10000원
      setState('cartList', [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ]);
      product.stock -= 1;
      setState('products', getState().products);

      // 총액 계산
      cartCalculate();

      // 총액 확인
      expect(getState().totalAmount).toBe(10000);
      expect(getState().points).toBe(10); // 1% 포인트
    });

    // 같은 상품을 여러 개 추가할 때 총액이 올바르게 계산되는지 확인
    it('같은 상품을 여러 개 추가할 때 총액이 올바르게 계산된다', () => {
      // 장바구니에 상품 추가 (상품1 x 3개)
      const product = getState().products[0]; // 상품1: 10000원
      setState('cartList', [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 3,
        },
      ]);
      product.stock -= 3;
      setState('products', getState().products);

      // 총액 계산
      cartCalculate();

      // 총액 확인
      expect(getState().totalAmount).toBe(30000);
      expect(getState().points).toBe(30); // 1% 포인트
    });

    // 여러 상품을 추가할 때 총액이 올바르게 계산되는지 확인
    it('여러 상품을 추가할 때 총액이 올바르게 계산된다', () => {
      // 장바구니에 여러 상품 추가
      const products = getState().products;
      setState('cartList', [
        {
          id: products[0].id,
          name: products[0].name,
          price: products[0].price,
          quantity: 1,
        },
        {
          id: products[1].id,
          name: products[1].name,
          price: products[1].price,
          quantity: 2,
        },
      ]);
      products[0].stock -= 1;
      products[1].stock -= 2;
      setState('products', products);

      // 총액 계산
      cartCalculate();

      // 총액 확인 (10000 + 20000*2 = 50000)
      expect(getState().totalAmount).toBe(50000);
      expect(getState().points).toBe(50); // 1% 포인트
    });

    // 10개 이상 구매 시 상품별 할인이 적용되는지 확인
    it('10개 이상 구매 시 상품별 할인이 적용된다', () => {
      // 장바구니에 상품 추가 (상품1 x 10개)
      const product = getState().products[0]; // 상품1: 10000원, 할인율 10%
      setState('cartList', [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 10,
        },
      ]);
      product.stock -= 10;
      setState('products', getState().products);

      // 총액 계산
      cartCalculate();

      // 총액 확인 (10000원 * 10개 * 0.9(10% 할인) = 90000)
      expect(getState().totalAmount).toBe(90000);
      expect(getState().discountRate).toBeCloseTo(0.1);
      expect(getState().points).toBe(90); // 1% 포인트
    });

    // 포인트가 올바르게 계산되는지 확인
    it('포인트가 총액의 0.1%로 올바르게 계산된다', () => {
      // 다양한 가격의 상품을 장바구니에 추가
      const products = getState().products;
      setState('cartList', [
        {
          id: products[0].id,
          name: products[0].name,
          price: products[0].price,
          quantity: 1,
        }, // 10000원
        {
          id: products[1].id,
          name: products[1].name,
          price: products[1].price,
          quantity: 1,
        }, // 20000원
        {
          id: products[2].id,
          name: products[2].name,
          price: products[2].price,
          quantity: 1,
        }, // 30000원
      ]);
      products[0].stock -= 1;
      products[1].stock -= 1;
      products[2].stock -= 1;
      setState('products', products);

      // 총액 계산
      cartCalculate();

      // 포인트 확인 (총액 60000원의 0.1% = 60)
      expect(getState().totalAmount).toBe(60000);
      expect(getState().points).toBe(60);
    });

    // 상품별 할인과 장바구니 전체 할인 중 더 높은 할인이 적용되는지 확인
    it('상품별 할인과 장바구니 전체 할인 중 더 높은 할인이 적용된다', () => {
      // 장바구니에 여러 상품 추가 (총합 30개)
      const products = getState().products;
      setState('cartList', [
        {
          id: products[0].id,
          name: products[0].name,
          price: products[0].price,
          quantity: 10,
        }, // 10% 할인
        {
          id: products[1].id,
          name: products[1].name,
          price: products[1].price,
          quantity: 10,
        }, // 15% 할인
        {
          id: products[2].id,
          name: products[2].name,
          price: products[2].price,
          quantity: 10,
        }, // 20% 할인
      ]);
      products[0].stock -= 10;
      products[1].stock -= 10;
      products[2].stock -= 10;
      setState('products', products);

      // 총액 계산
      cartCalculate();

      // 상품별 할인율: 상품1(10%), 상품2(15%), 상품3(20%)
      // 장바구니 전체 할인: 25%
      // 25% > 평균 할인율 이므로 25% 할인이 적용되어야 함
      const originalTotal = 10000 * 10 + 20000 * 10 + 30000 * 10; // 600000
      const expectedTotal = originalTotal * 0.75; // 450000 (25% 할인)

      expect(getState().totalAmount).toBe(expectedTotal);
      expect(getState().discountRate).toBe(0.25);
    });
  });
});
