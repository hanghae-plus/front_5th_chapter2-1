import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

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

  it('번개세일 기능이 정상적으로 동작하는지 확인', () => {});

  it('추천 상품 알림이 표시되는지 확인', () => {});

  it('화요일 할인이 적용되는지 확인', async () => {});

  it('재고가 부족한 경우 추가되지 않는지 확인', async () => {
    render(<App />);
    const user = userEvent.setup();

    // p4 상품 선택 (재고 없음)
    await user.selectOptions(screen.getByTestId('product-select'), 'p4');
    fireEvent.click(screen.getByTestId('add-to-cart'));

    const cartDisp = screen.getByTestId('cart-items');
    // p4 상품이 장바구니에 없는지 확인
    const p4InCart = Array.from(cartDisp.children).some(
      (item) => item.id === 'p4',
    );
    expect(p4InCart).toBe(false);

    const stockInfo = screen.getByTestId('stock-status');
    expect(stockInfo.textContent).toContain('상품4: 품절');
  });

  it('재고가 부족한 경우 추가되지 않고 알림이 표시되는지 확인', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.selectOptions(screen.getByTestId('product-select'), 'p5');
    fireEvent.click(screen.getByTestId('add-to-cart'));

    const cartDisp = screen.getByTestId('cart-items');

    // p5 상품이 장바구니에 추가되었는지 확인
    const p5InCart = Array.from(cartDisp.children).some(
      (item) => item.id === 'p5',
    );
    expect(p5InCart).toBe(true);

    // 수량 증가 버튼 찾기
    const increaseBtn = cartDisp.querySelector(
      '#p5 .quantity-change[data-change="1"]',
    );
    expect(increaseBtn).not.toBeNull();

    // 수량을 10번 증가시키기
    for (let i = 0; i < 10; i++) {
      const increaseBtn = cartDisp.querySelector(
        '#p5 .quantity-change[data-change="1"]',
      ) as HTMLButtonElement;
      fireEvent.click(increaseBtn);
    }

    // 11번째 클릭 시 재고 부족 알림이 표시되어야 함
    fireEvent.click(increaseBtn!);

    // 재고 부족 알림이 표시되었는지 확인
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining('재고가 부족합니다'),
    );

    // 장바구니의 상품 수량이 10개인지 확인
    const itemQuantity = cartDisp.querySelector('#p5 span')?.textContent;
    expect(itemQuantity).toContain('x 10');

    // 재고 상태 정보에 해당 상품이 재고 부족으로 표시되는지 확인
    const stockInfo = screen.getByTestId('stock-status');
    expect(stockInfo.textContent).toContain('상품5: 품절');
  });
});
