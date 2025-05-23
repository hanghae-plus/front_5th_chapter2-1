import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  BULK_DISCOUNT_LIMIT,
  TOTAL_BULK_DISCOUNT_LIMIT,
  TOTAL_BULK_DISCOUNT_RATE,
  WEEKLY_SPECIAL_DAY,
  WEEKLY_SPECIAL_DISCOUNT_RATE,
} from "../config/constants";
import { STOCK_ALERT_TEXT } from "../config/messages";
import { useProduct } from "../hooks/use-product";
import { Cart, PLUS_MINUS, PlusMinus, Product } from "../types";

export const CartContext = createContext<{
  cart: Cart;
  handleCartItem: (id: Product["id"], mode: PlusMinus) => void;
  handleRemoveItem: (id: Product["id"]) => void;
  getTotalCost: () => { totalCost: number; discountRate: number };
} | null>(null);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const { products, setProducts } = useProduct();

  const [cart, setCart] = useState<Cart>({});

  const handleCartItem = useCallback(
    (id: Product["id"], mode: PlusMinus) => {
      const targetIdx = products.findIndex((product) => product.id === id);
      if (targetIdx === -1) return;

      if (mode === PLUS_MINUS.PLUS) {
        if (!products[targetIdx].quantity) {
          alert(STOCK_ALERT_TEXT);
          return;
        }
        setCart((prev) => {
          const next = { ...prev };
          next[id] = (next[id] || 0) + 1;
          return next;
        });
        setProducts((prev) => {
          const next = [...prev];
          next[targetIdx] = {
            ...next[targetIdx],
            quantity: next[targetIdx].quantity - 1,
          };
          return next;
        });
      } else {
        if (!cart[id]) return;
        setCart((prev) => {
          const next = { ...prev };
          next[id] -= 1;
          if (next[id] <= 0) delete next[id];
          return next;
        });
        setProducts((prev) => {
          const next = [...prev];
          next[targetIdx] = {
            ...next[targetIdx],
            quantity: next[targetIdx].quantity + 1,
          };
          return next;
        });
      }
    },
    [products, cart]
  );

  const handleRemoveItem = useCallback(
    (id: Product["id"]) => {
      if (!cart[id]) return;
      const targetIdx = products.findIndex((product) => product.id === id);
      if (targetIdx === -1) return;
      const quantity = cart[id];
      setCart((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      setProducts((prev) => {
        const next = [...prev];
        next[targetIdx] = {
          ...next[targetIdx],
          quantity: next[targetIdx].quantity + quantity,
        };
        return next;
      });
    },
    [products, cart]
  );

  const getTotalCost = useCallback(() => {
    // 총액, 총 갯수
    let totalCost = 0;
    let itemCount = 0;

    // 개별 할인 미적용 소계
    let subTotal = 0;
    for (const [id, quantity] of [...Object.entries(cart)]) {
      const currentItem = products.find((p) => p.id === id);
      if (!currentItem) continue;
      const isDiscountItem =
        quantity >= BULK_DISCOUNT_LIMIT && !!currentItem.discount;

      const itemTotal = quantity * currentItem.cost;
      const discount = isDiscountItem ? currentItem.discount : 0;

      itemCount += quantity;
      subTotal += itemTotal;
      totalCost += itemTotal * (1 - discount);
    }

    // 전체 수량 기준 할인율 계산
    const itemDiscount = subTotal - totalCost;
    let discountRate = itemDiscount / subTotal;

    if (itemCount >= TOTAL_BULK_DISCOUNT_LIMIT) {
      const bulkDiscount = totalCost * TOTAL_BULK_DISCOUNT_RATE;
      if (bulkDiscount > itemDiscount) {
        totalCost = subTotal * (1 - TOTAL_BULK_DISCOUNT_RATE);
        discountRate = TOTAL_BULK_DISCOUNT_RATE;
      }
    }

    // 매주 화요일 특별 할인
    if (new Date().getDay() === WEEKLY_SPECIAL_DAY) {
      totalCost *= 1 - WEEKLY_SPECIAL_DISCOUNT_RATE;
      discountRate = Math.max(discountRate, WEEKLY_SPECIAL_DISCOUNT_RATE);
    }
    return { totalCost, discountRate };
  }, [products, cart]);

  const value = useMemo(
    () => ({ cart, handleCartItem, handleRemoveItem, getTotalCost }),
    [cart, handleCartItem, handleRemoveItem, getTotalCost]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
