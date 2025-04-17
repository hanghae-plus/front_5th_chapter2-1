import '@testing-library/jest-dom';
import { describe, it, beforeEach, vi, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('ShoppingCart 컴포넌트', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('초기 상태: 상품 드롭다운 및 버튼, 총액, 재고 상태가 제대로 렌더링된다', async () => {
    const { container } = render(<App />);

    const select = await screen.findByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select.children).toHaveLength(5);

    expect(select.children[0]).toHaveValue('p1');
    expect(select.children[0]).toHaveTextContent('상품1 - 10000원');
    expect(select.children[3]).toBeDisabled();

    expect(screen.getByRole('heading', { name: '장바구니' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '추가' })).toBeInTheDocument();
    const total = screen.getByText(/총액: 0원/);
    expect(total).toHaveTextContent('(포인트: 0)');

    const stockStatus = container.querySelector('#stock-status');
    expect(stockStatus).toBeInTheDocument();
  });

  it('장바구니에 상품을 추가·수량 변경·삭제할 수 있다', async () => {
    render(<App />);
    const select = screen.getByRole('combobox');
    const addBtn = screen.getByRole('button', { name: '추가' });

    userEvent.selectOptions(select, 'p1');
    userEvent.click(addBtn);
    expect(await screen.findByText(/상품1 - 10000원 x 1/)).toBeInTheDocument();

    const incBtn = screen.getByRole('button', { name: '+' });
    await userEvent.click(incBtn);
    expect(screen.getByText(/상품1 - 10000원 x 2/)).toBeInTheDocument();

    const delBtn = screen.getByRole('button', { name: '삭제' });
    await userEvent.click(delBtn);
    expect(screen.queryByText(/상품1 - 10000원 x 2/)).toBeNull();
    expect(screen.getByText(/총액: 0원/)).toHaveTextContent('(포인트: 0)');
  });

  it('총액, 할인, 포인트가 올바르게 계산된다', async () => {
    render(<App />);
    const select = screen.getByRole('combobox');
    const addBtn = screen.getByRole('button', { name: '추가' });

    userEvent.selectOptions(select, 'p1');
    userEvent.click(addBtn);
    await userEvent.click(addBtn);

    const total = screen.getByText(/총액: 20000원/);
    expect(total).toHaveTextContent('(포인트: 20)');

    for (let i = 0; i < 8; i++) {
      await userEvent.click(addBtn);
    }
    expect(screen.getByText(/\(10\.0% 할인 적용\)/)).toBeInTheDocument();
  });

  it('재고 부족 시 동작을 막고 알림을 보여준다', async () => {
    const { container } = render(<App />);
    const select = screen.getByRole('combobox');
    const addBtn = screen.getByRole('button', { name: '추가' });

    await userEvent.selectOptions(select, 'p4');
    await userEvent.click(addBtn);

    const stockStatus = container.querySelector('#stock-status');
    expect(stockStatus).toHaveTextContent('상품4: 품절');

    userEvent.selectOptions(select, 'p5');
    await userEvent.click(addBtn);

    const incBtn = screen.getAllByRole('button', { name: '+' })[1];
    for (let i = 0; i < 10; i++) {
      await userEvent.click(incBtn);
    }
    await userEvent.click(incBtn);

    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('재고 부족'));
  });
});
