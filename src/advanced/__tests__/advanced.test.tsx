import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import App from '../App';

import '@testing-library/jest-dom';

describe('advanced test', () => {
  beforeEach(() => {
    // 날짜별 행사에 대응하기 위해 날짜 고정
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

    const productOptions = productList.children as HTMLOptionsCollection;

    // 첫 번째 상품 확인
    expect(productOptions[0]?.value).toBe('p1');
    expect(productOptions[0].textContent).toBe('상품1 - 10000원');
    expect(productOptions[0].disabled).toBe(false);

    // 마지막 상품 확인
    expect(productOptions[4].value).toBe('p5');
    expect(productOptions[4].textContent).toBe('상품5 - 25000원');
    expect(productOptions[4].disabled).toBe(false);

    // 재고 없는 상품 확인 (상품4)
    expect(productOptions[3].value).toBe('p4');
    expect(productOptions[3].textContent).toBe('상품4 - 15000원');
    expect(productOptions[3].disabled).toBe(true);
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

  it('상품을 장바구니에 추가하고, 수량을 추가 있는지 확인', async () => {
    render(<App />);

    const user = userEvent.setup();

    const sel = screen.getByTestId('product-select') as HTMLSelectElement;
    const addBtn = screen.getByTestId('add-to-cart') as HTMLButtonElement;

    await user.selectOptions(sel, 'p1');
    fireEvent.click(addBtn);

    const cartDisp = screen.getByTestId('cart-items');
    expect(cartDisp.children.length).toBe(1);
    expect(cartDisp.children?.[0].querySelector('span')?.textContent).toContain(
      '상품1 - 10000원 x 1',
    );

    const increaseBtn = cartDisp.querySelector(
      '.quantity-change[data-change="1"]',
    ) as HTMLButtonElement;

    fireEvent.click(increaseBtn);
    expect(cartDisp.children[0].querySelector('span')?.textContent).toContain(
      '상품1 - 10000원 x 2',
    );
  });

  it('장바구니 추가된 상품을 삭제할 수 있는지 확인', async () => {
    render(<App />);
    const user = userEvent.setup();

    const sel = screen.getByTestId('product-select') as HTMLSelectElement;
    const addBtn = screen.getByTestId('add-to-cart') as HTMLButtonElement;

    await user.selectOptions(sel, 'p1');
    fireEvent.click(addBtn);

    const cartDisp = screen.getByTestId('cart-items');
    expect(cartDisp.children.length).toBe(1);
    expect(cartDisp.children?.[0].querySelector('span')?.textContent).toContain(
      '상품1 - 10000원 x 1',
    );

    const removeBtn = cartDisp.querySelector(
      '.remove-item',
    ) as HTMLButtonElement;
    expect(removeBtn).toBeInTheDocument();
    fireEvent.click(removeBtn);
    expect(cartDisp.children.length).toBe(0);

    const sum = screen.getByTestId('cart-total');
    expect(sum.textContent).toContain('총액: 0원(포인트: 0)');
  });

  it('총액이 올바르게 계산되는지 확인', async () => {
    render(<App />);
    const user = userEvent.setup();

    const sel = screen.getByTestId('product-select') as HTMLSelectElement;
    const addBtn = screen.getByTestId('add-to-cart') as HTMLButtonElement;
    const sum = screen.getByTestId('cart-total');

    await user.selectOptions(sel, 'p1');
    fireEvent.click(addBtn);
    fireEvent.click(addBtn);

    expect(sum.textContent).toContain('총액: 20000원(포인트: 20)');
  });

  it('할인이 올바르게 적용되고, 포인트가 올바르게 계산되는지 확인', async () => {
    render(<App />);

    const user = userEvent.setup();

    await user.selectOptions(screen.getByTestId('product-select'), 'p1');

    Array.from({ length: 12 }).forEach(() => {
      fireEvent.click(screen.getByTestId('add-to-cart'));
    });

    expect(screen.getByTestId('cart-total').textContent).toContain(
      '(10.0% 할인 적용)',
    );

    // p2 상품 선택 및 추가
    await user.selectOptions(screen.getByTestId('product-select'), 'p2');
    fireEvent.click(screen.getByTestId('add-to-cart'));

    expect(document.getElementById('loyalty-points')?.textContent).toContain(
      '(포인트: 128)',
    );
  });

  it('번개세일 기능이 정상적으로 동작하는지 확인', () => {
    // 일부러 랜덤이 가득한 기능을 넣어서 테스트 하기를 어렵게 만들었습니다. 이런 코드는 어떻게 하면 좋을지 한번 고민해보세요!
  });

  it('추천 상품 알림이 표시되는지 확인', () => {
    // 일부러 랜덤이 가득한 기능을 넣어서 테스트 하기를 어렵게 만들었습니다. 이런 코드는 어떻게 하면 좋을지 한번 고민해보세요!
  });
});
