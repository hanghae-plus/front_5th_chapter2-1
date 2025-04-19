안녕하세요 성찬님!
4주차 과제 잘 진행해주셨네요 ㅎㅎ 고생하셨습니다!

---

> 테스트코드 수정한 부분들이 있는데, 한 번에 실행하거나 각각 실행할 때도 통과하도록 하기 위해 수정을 했어요. 주제가 클린 코드인 만큼, 클린 테스트 코드가 그런게 아닐까 하는 생각에 수정을 해보았습니다.

테스트코드를 개선하신 시도가 인상적입니다! 테스트 실행 환경을 고려하신 점이 좋네요. 테스트 코드도 결국 코드이기 때문에 클린코드 원칙을 적용하는 것은 매우 중요합니다. 다만 한 가지 생각해볼 점은, 테스트 코드 수정 시 원래 테스트가 검증하려던 의도를 해치지 않았는지 확인하는 것이 중요합니다.

만약 다음과 같은 상황이 생긴다면 어떻게 하실 건가요?

1. 테스트 코드가 통과하지만 실제로는 버그가 있는 경우
2. 테스트 간 의존성이 있어 실행 순서에 따라 결과가 달라지는 경우

이런 상황에서 테스트 코드를 어떻게 개선하실지 한번 고민해보시면 좋을 것 같습니다.

> state를 proxy객체로 만들어 보았습니다. proxy 객체 handler에서 set이 실행될 때 rendering을 하는 전략인데, 객체 프로퍼티에 대한 추적이 되지 않아 state 구조가 장바구니와 재고로 나뉘어졌습니다.

Proxy 객체를 활용하신 접근이 매우 흥미롭습니다! React의 상태 관리 패턴을 바닐라 JS에서 구현하신 것이 창의적입니다. 다만 Proxy 객체로 중첩된 객체 속성까지 추적하기 위해서는 조금 더 복잡한 구현이 필요합니다.

만약 다음 요구사항이 추가된다면 어떻게 개선하실 건가요?

1. 장바구니에 있는 각 상품별로 선택된 옵션도 추적해야 한다면? (예: 색상, 사이즈)
2. 사용자가 장바구니에 넣은 상품의 이력을 추적해야 한다면?

이런 복잡한 상태에서도 Proxy 패턴을 확장할 수 있을지 고민해보시면 좋을 것 같습니다.

> 기본과제: 전체적인 리팩토링 방향이 리액트와 비슷해야 하는데, 어떻게 하면 될지 감이 안잡혀 조금씩 생각나는대로 고치다보니 방향이 좀 안맞은 것 같네요.

바닐라 JS에서 React 스타일의 아키텍처를 구현하는 것은 쉽지 않은 일입니다. 그럼에도 불구하고 컴포넌트화와 상태 관리를 시도하신 점이 인상적입니다.

제가 생각하는 리액트 스타일의 핵심은 '선언형 프로그래밍'과 '단방향 데이터 흐름'입니다. 이 두 가지를 바닐라 JS에서 구현한다면

1. 상태 변경 → 렌더링 함수 호출 → DOM 업데이트라는 흐름 (지금 proxy로 하신 부분)
2. DOM 요소를 직접 조작하지 않고 템플릿 기반으로 생성

이런 점들을 구현하셨네요! 다만 이 구조를 더 발전시킨다면, 각 컴포넌트가 자신의 상태를 갖고 렌더링하는 구조로 발전시킬 수 있을 것 같습니다.

사실 제일 중요한건, "데이터"와 "계산"을 분리하는 과정입니다. 이게 리액트와 의존적이지 않은 부분이라서요 ㅎㅎ
마찬가지로, 리액트가 아닌 다른 프레임워크를 사용한다고 하더라도 재활용할 수 있는 부분일 수 있어요!
이런 점도 같이 고려해보시면 좋답니다.

> 기본과제를 하다가 심화과제를 하니 확실히 리팩토링하기 쉬웠던 것 같아요. 리액트의 구조가 개발자에게 편리함을 제공하는 것이 확 느껴졌어요.

정말 그렇죠! React의 선언형 프로그래밍 방식이 개발 경험을 크게 개선하는 것을 체감하신 것 같네요. 바닐라 JS에서 동일한 기능을 구현하려면 더 많은 코드와 복잡성이 따르게 됩니다.

> 심층과제에서 랜덤 할인에 대한 부분을 어떤 구조로 가져가면 좋을지 감이 안잡혔습니다...

이 부분은 할인 규칙을 선언하고, 선언된 규칙을 일괄 적용하는 방식으로 관리하면 좋답니다!

가령 100개와 같은 많은 할인 규칙이 있을 때 어떻게 체계적으로 관리할 수 있는지 살펴보겠습니다. 디테일한 내용보단 코드의 흐름 정도만 파악해주세요!

## 선언형 할인 규칙 시스템 설계

React 환경에서 할인 규칙을 선언적으로 구현한다면 다음과 같은 접근 방식을 고려해볼 수 있습니다:

```typescript
// types.ts - 할인 규칙에 대한 타입 정의
type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  // 기타 필요한 속성들...
};

type CartItem = {
  product: Product;
  quantity: number;
};

// 할인 규칙 타입 (여러 종류의 할인 규칙을 표현할 수 있는 유니온 타입)
type DiscountRule =
  | QuantityBasedDiscount
  | DateBasedDiscount
  | ProductCategoryDiscount
  | RandomDiscount
  | CombinationDiscount;

// 수량 기반 할인
interface QuantityBasedDiscount {
  type: "quantity";
  name: string;
  description: string;
  productId?: string; // 특정 상품에만 적용하려면 ID 지정, 없으면 모든 상품
  minQuantity: number;
  discountRate: number;
}

// 날짜 기반 할인
interface DateBasedDiscount {
  type: "date";
  name: string;
  description: string;
  dayOfWeek?: number; // 0-6, 없으면 모든 요일
  startDate?: Date;
  endDate?: Date;
  discountRate: number;
}

// 상품 카테고리 할인
interface ProductCategoryDiscount {
  type: "category";
  name: string;
  description: string;
  category: string;
  discountRate: number;
}

// 랜덤 할인
interface RandomDiscount {
  type: "random";
  name: string;
  description: string;
  probability: number; // 0-1 사이 확률
  discountRate: number;
  appliedProductIds: string[]; // 적용된 상품 ID들 (런타임에 결정)
}

// 여러 조건 결합 할인
interface CombinationDiscount {
  type: "combination";
  name: string;
  description: string;
  conditions: Array<Omit<DiscountRule, "name" | "description">>;
  discountRate: number; // 모든 조건 충족 시 적용할 할인율
}

// 할인 적용 결과 타입
interface AppliedDiscount {
  ruleName: string;
  discountAmount: number;
  discountRate: number;
  appliedItems: string[]; // 할인이 적용된 상품 ID 목록
}
```

이제 할인 규칙을 적용하는 함수를 만들어 보겠습니다:

```typescript
// discountService.ts - 할인 로직을 담당하는 서비스

// 모든 할인 규칙을 한 곳에서 정의
const discountRules: DiscountRule[] = [
  {
    type: "quantity",
    name: "10개 이상 구매 할인",
    description: "동일 상품 10개 이상 구매 시 10% 할인",
    minQuantity: 10,
    discountRate: 0.1,
  },
  {
    type: "date",
    name: "화요일 특별 할인",
    description: "화요일에는 모든 상품 10% 할인",
    dayOfWeek: 2, // 화요일
    discountRate: 0.1,
  },
  {
    type: "random",
    name: "번개 할인",
    description: "랜덤으로 선택된 상품 20% 할인",
    probability: 0.3,
    discountRate: 0.2,
    appliedProductIds: [], // 초기값은 빈 배열
  },
  // ... 추가 규칙들 (최대 100개)
];

// 할인 규칙 처리기들 - 각 타입별로 별도의 함수로 처리
const discountHandlers = {
  quantity: (
    rule: QuantityBasedDiscount,
    items: CartItem[]
  ): AppliedDiscount | null => {
    const applicableItems = items.filter(
      (item) =>
        (!rule.productId || item.product.id === rule.productId) &&
        item.quantity >= rule.minQuantity
    );

    if (applicableItems.length === 0) return null;

    const discountAmount = applicableItems.reduce(
      (total, item) =>
        total + item.product.price * item.quantity * rule.discountRate,
      0
    );

    return {
      ruleName: rule.name,
      discountAmount,
      discountRate: rule.discountRate,
      appliedItems: applicableItems.map((item) => item.product.id),
    };
  },

  date: (
    rule: DateBasedDiscount,
    items: CartItem[]
  ): AppliedDiscount | null => {
    const now = new Date();
    const currentDay = now.getDay();

    // 날짜 조건 확인
    if (rule.dayOfWeek !== undefined && rule.dayOfWeek !== currentDay)
      return null;
    if (rule.startDate && now < rule.startDate) return null;
    if (rule.endDate && now > rule.endDate) return null;

    // 모든 아이템에 할인 적용
    const discountAmount = items.reduce(
      (total, item) =>
        total + item.product.price * item.quantity * rule.discountRate,
      0
    );

    return {
      ruleName: rule.name,
      discountAmount,
      discountRate: rule.discountRate,
      appliedItems: items.map((item) => item.product.id),
    };
  },

  category: (
    rule: ProductCategoryDiscount,
    items: CartItem[]
  ): AppliedDiscount | null => {
    const applicableItems = items.filter(
      (item) => item.product.category === rule.category
    );

    if (applicableItems.length === 0) return null;

    const discountAmount = applicableItems.reduce(
      (total, item) =>
        total + item.product.price * item.quantity * rule.discountRate,
      0
    );

    return {
      ruleName: rule.name,
      discountAmount,
      discountRate: rule.discountRate,
      appliedItems: applicableItems.map((item) => item.product.id),
    };
  },

  random: (rule: RandomDiscount, items: CartItem[]): AppliedDiscount | null => {
    // 이미 적용된 랜덤 할인이 있는지 확인
    if (rule.appliedProductIds.length > 0) {
      const applicableItems = items.filter((item) =>
        rule.appliedProductIds.includes(item.product.id)
      );

      if (applicableItems.length === 0) return null;

      const discountAmount = applicableItems.reduce(
        (total, item) =>
          total + item.product.price * item.quantity * rule.discountRate,
        0
      );

      return {
        ruleName: rule.name,
        discountAmount,
        discountRate: rule.discountRate,
        appliedItems: applicableItems.map((item) => item.product.id),
      };
    }

    // 새로운 랜덤 할인을 적용할지 결정
    if (Math.random() < rule.probability) {
      // 랜덤으로 상품 하나 선택
      if (items.length === 0) return null;

      const randomIndex = Math.floor(Math.random() * items.length);
      const selectedItem = items[randomIndex];

      // 선택된 상품 ID 기록 (다음 계산에서 일관성 유지)
      rule.appliedProductIds = [selectedItem.product.id];

      const discountAmount =
        selectedItem.product.price * selectedItem.quantity * rule.discountRate;

      return {
        ruleName: rule.name,
        discountAmount,
        discountRate: rule.discountRate,
        appliedItems: [selectedItem.product.id],
      };
    }

    return null;
  },

  combination: (
    rule: CombinationDiscount,
    items: CartItem[]
  ): AppliedDiscount | null => {
    // 모든 조건이 만족되는지 확인
    const allConditionsMet = rule.conditions.every((condition) => {
      const handler =
        discountHandlers[condition.type as keyof typeof discountHandlers];
      // 임시 규칙 객체 생성 (name과 description은 의미 없음)
      const tempRule = {
        ...condition,
        name: "",
        description: "",
      } as DiscountRule;

      return handler(tempRule as any, items) !== null;
    });

    if (!allConditionsMet) return null;

    // 모든 조건 충족 시 전체 할인 적용
    const discountAmount = items.reduce(
      (total, item) =>
        total + item.product.price * item.quantity * rule.discountRate,
      0
    );

    return {
      ruleName: rule.name,
      discountAmount,
      discountRate: rule.discountRate,
      appliedItems: items.map((item) => item.product.id),
    };
  },
};

// 최종 할인 계산 함수
export const calculateDiscounts = (
  cartItems: CartItem[]
): AppliedDiscount[] => {
  const appliedDiscounts: AppliedDiscount[] = [];

  for (const rule of discountRules) {
    const handler =
      discountHandlers[rule.type as keyof typeof discountHandlers];
    const result = handler(rule as any, cartItems);

    if (result) {
      appliedDiscounts.push(result);
    }
  }

  return appliedDiscounts;
};

// 할인 총액 계산
export const calculateTotalDiscount = (
  cartItems: CartItem[]
): {
  appliedDiscounts: AppliedDiscount[];
  totalDiscountAmount: number;
  totalPrice: number;
  finalPrice: number;
} => {
  const appliedDiscounts = calculateDiscounts(cartItems);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const totalDiscountAmount = appliedDiscounts.reduce(
    (total, discount) => total + discount.discountAmount,
    0
  );

  return {
    appliedDiscounts,
    totalDiscountAmount,
    totalPrice,
    finalPrice: totalPrice - totalDiscountAmount,
  };
};
```

## 사용 예시

이제 이 할인 시스템을 React 컴포넌트에서 어떻게 사용할 수 있는지 보여드리겠습니다

```tsx
// Cart.tsx
import React, { useEffect, useState } from "react";
import { calculateTotalDiscount } from "./discountService";
import { CartItem } from "./types";

interface CartProps {
  items: CartItem[];
}

const Cart: React.FC<CartProps> = ({ items }) => {
  const [discountResults, setDiscountResults] =
    useState<ReturnType<typeof calculateTotalDiscount>>();

  useEffect(() => {
    // 결제 전에 할인 계산
    const results = calculateTotalDiscount(items);
    setDiscountResults(results);

    // 랜덤 할인을 위한 정기적인 업데이트
    const timer = setInterval(() => {
      setDiscountResults(calculateTotalDiscount(items));
    }, 30000); // 30초마다 업데이트

    return () => clearInterval(timer);
  }, [items]);

  if (!discountResults) return <div>Loading...</div>;

  return (
    <div className="cart">
      <h2>장바구니</h2>

      {items.map((item) => (
        <div key={item.product.id} className="cart-item">
          <div>{item.product.name}</div>
          <div>
            {item.quantity} x {item.product.price}원
          </div>
          <div>{item.product.price * item.quantity}원</div>
        </div>
      ))}

      <div className="cart-summary">
        <div>상품 금액: {discountResults.totalPrice}원</div>

        {discountResults.appliedDiscounts.length > 0 && (
          <div className="discounts">
            <h3>적용된 할인</h3>
            {discountResults.appliedDiscounts.map((discount, index) => (
              <div key={index} className="discount-item">
                <div>{discount.ruleName}</div>
                <div>
                  -{discount.discountAmount}원 ({discount.discountRate * 100}%)
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="total-discount">
          총 할인 금액: {discountResults.totalDiscountAmount}원
        </div>

        <div className="final-price">
          최종 결제 금액: {discountResults.finalPrice}원
        </div>
      </div>
    </div>
  );
};

export default Cart;
```

## 선언형 접근의 이점

이 접근 방식의 주요 장점은 다음과 같습니다

1. 선언적 규칙 정의: 할인 규칙이 모두 데이터로 정의되어 있어 로직과 분리됩니다.
2. 확장성: 새로운 할인 유형이 필요하면 타입과 처리기만 추가하면 됩니다.
3. 유지보수성: 할인 규칙을 변경하려면 데이터만 수정하면 됩니다.
4. 테스트 용이성: 각 할인 처리기는 독립적으로 테스트할 수 있습니다.
5. 중앙화된 관리: 모든 할인 규칙이 한 곳에서 관리됩니다.

## 추가 개선 사항

이 디자인을 더 발전시키려면 다음과 같은 접근을 고려해볼 수 있습니다

1. 할인 우선순위: 할인 규칙에 우선순위를 추가하여 충돌 시 어떤 규칙이 적용될지 결정합니다.
2. 할인 제한: 최대 할인 금액이나 중복 할인 제한을 추가합니다.
3. 할인 구성: 관리자 UI를 통해 할인 규칙을 동적으로 구성할 수 있게 합니다.
4. 서버 동기화: 서버에서 할인 규칙을 가져와 클라이언트와 동기화합니다.
5. 할인 기록: 적용된 할인 내역을 저장하여 사용자에게 보여줍니다.

이렇게 설계하면 여러 개의 할인 규칙도 체계적으로 관리할 수 있으며, 새로운 할인 유형도 쉽게 추가할 수 있습니다. 또한 선언적 접근 방식은 비즈니스 로직을 더 명확하게 표현할 수 있어 개발자와 비개발자 모두 이해하기 쉽습니다.

---

수고하셨습니다! 궁금한 점이 있으시면 언제든 질문해주세요.
