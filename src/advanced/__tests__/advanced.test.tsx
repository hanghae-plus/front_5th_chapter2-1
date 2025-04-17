import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('advanced test', () => {
  beforeEach(() => {
    // 날짜별 행사에 대응하기 위해 날짜 고정
    vi.useFakeTimers();
    const mockDate = new Date('2025-04-18');
    vi.setSystemTime(mockDate);
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('초기 상태: 상품 목록이 올바르게 그려졌는지 확인', () => {
    render(<App />);
    const productList = screen.getByTestId('product-select');
    expect(productList).toBeInTheDocument();
    expect(productList.tagName.toLowerCase()).toBe('select');
    expect(productList.children.length).toBe(5);

    // 첫 번째 상품 확인
    expect((productList.children[0] as HTMLOptionElement).value).toBe('p1');
    expect(productList.children[0].textContent).toBe('상품1 - 10000원');
    expect((productList.children[0] as HTMLOptionElement).disabled).toBe(false);

    // 마지막 상품 확인
    expect((productList.children[4] as HTMLOptionElement).value).toBe('p5');
    expect(productList.children[4].textContent).toBe('상품5 - 25000원');
    expect((productList.children[4] as HTMLOptionElement).disabled).toBe(false);

    // 재고 없는 상품 확인 (상품4)
    expect((productList.children[3] as HTMLOptionElement).value).toBe('p4');
    expect(productList.children[3].textContent).toBe('상품4 - 15000원');
    expect((productList.children[3] as HTMLOptionElement).disabled).toBe(true);
  });

  it('초기 상태: DOM 요소가 올바르게 생성되었는지 확인', () => {
    render(<App />);

    const sel = screen.getByTestId('product-select');
    const addBtn = screen.getByTestId('add-to-cart');
    const cartDisp = screen.getByTestId('cart-items');
    const sum = screen.getByTestId('cart-total');
    const stockInfo = screen.getByTestId('stock-status');
    expect(document.querySelector('h1')?.textContent).toBe('장바구니');
    expect(sel).toBeInTheDocument();
    expect(addBtn).toBeInTheDocument();
    expect(cartDisp).toBeInTheDocument();
    expect(sum.textContent).toContain('총액: 0원(포인트: 0)');
    expect(stockInfo).toBeInTheDocument();
  });
});
