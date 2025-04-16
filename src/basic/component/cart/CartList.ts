import type { GlobalState } from "../../types";

interface CartListProps {
  target: HTMLElement;
  initialState: GlobalState;
  handleCountChange: (productId: string, change: number) => void;
  handleCartItemRemove: (productId: string) => void;
}

export function CartList({ target, initialState, handleCountChange, handleCartItemRemove }: CartListProps) {
  this.element = document.createElement("div");
  target.appendChild(this.element);

  this.element.id = "cart-items";

  this.state = initialState;
  // setState: 이전 state와 비교해서 render 함수를 호출
  this.setState = (newState: GlobalState) => {
    const isChanged = JSON.stringify(this.state) !== JSON.stringify(newState);
    if (isChanged) {
      this.state = newState;
      this.render();
    }
  };

  // 전체 렌더링 대신 차이(diff)를 반영하는 방식의 render 함수
  this.render = () => {
    // 새 state의 item id 목록
    const newItemIds = new Set(this.state.cartList.map((item) => item.id));

    // 1. 새 항목 추가 및 기존 항목 업데이트
    // 1. 새 항목 추가 및 기존 항목 업데이트 (forEach -> for...of)
    for (const item of this.state.cartList) {
      // 각 item 요소의 id는 item.id로 설정되어 있음
      const itemElement = this.element.querySelector(`#${item.id}`);
      if (itemElement) {
        // 이미 DOM에 존재하면, 내부 내용 업데이트
        const spanEl = itemElement.querySelector("span");
        if (spanEl) {
          spanEl.textContent = `${item.name} - ${item.price}원 x ${item.count}`;
        }
      } else {
        // 없으면 새 요소 생성
        const newItemEl = document.createElement("div");
        newItemEl.id = item.id;
        newItemEl.className = "flex justify-between items-center mb-2";

        newItemEl.innerHTML = `
            <span>${item.name} - ${item.price}원 x ${item.count}</span>
            <div>
              <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${item.id}" data-change="-1">-</button>
              <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${item.id}" data-change="1">+</button>
              <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${item.id}">삭제</button>
            </div>
          `;
        this.element.appendChild(newItemEl);
      }
    }

    // 2. DOM에서 삭제된 항목 제거 (forEach -> for...of)
    const currentItemElements: HTMLElement[] = Array.from(this.element.children);
    for (const child of currentItemElements) {
      if (!newItemIds.has(child.id)) {
        // 현재 child의 id가 새 state에 없다면 삭제
        this.element.removeChild(child);
      }
    }
  };

  this.element.addEventListener("click", (event: MouseEvent) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.classList.contains("quantity-change")) {
      const change = target.dataset.change;
      const productId = target.dataset.productId ?? "";

      handleCountChange(productId, Number(change));
    }
  });

  this.element.addEventListener("click", (event: MouseEvent) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.classList.contains("remove-item")) {
      const productId = target.dataset.productId ?? "";
      handleCartItemRemove(productId);
    }
  });
}
