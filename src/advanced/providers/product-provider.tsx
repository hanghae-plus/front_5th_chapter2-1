import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Product } from "../types";

export const ProductContext = createContext<{
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  lastSelected: string;
  setLastSelected: Dispatch<SetStateAction<string>>;
} | null>(null);

type ProductProviderProps = {
  products: Product[];
  children: ReactNode;
};

export const ProductProvider = ({
  products: origin = [],
  children,
}: ProductProviderProps) => {
  const [products, setProducts] = useState(origin);
  const [lastSelected, setLastSelected] = useState<string>(
    origin?.[0].id || ""
  );

  /* ============ 무한루프나 무한 인터벌에서 벗어나지 못해 결국 GPT에 도움을 받은 부분 ============ */
  const productsRef = useRef(products);
  const lastSelectedRef = useRef(lastSelected);

  useEffect(() => {
    productsRef.current = products;
  }, [products]);

  useEffect(() => {
    lastSelectedRef.current = lastSelected;
  }, [lastSelected]);

  useEffect(() => {
    const lightningTimeout = setTimeout(() => {
      const lightningInterval = setInterval(() => {
        const currentProducts = productsRef.current;
        const idx = Math.floor(Math.random() * currentProducts.length);
        const luckyItem = currentProducts[idx];
        if (Math.random() < 0.3 && luckyItem.quantity > 0) {
          const discounted = Math.round(luckyItem.cost * 0.8);
          alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
          setProducts((prev) => {
            const next = [...prev];
            next[idx] = { ...next[idx], cost: discounted };
            return next;
          });
        }
      }, 30_000);

      return () => clearInterval(lightningInterval);
    }, Math.random() * 10_000);

    const suggestTimeout = setTimeout(() => {
      const suggestInterval = setInterval(() => {
        const currentProducts = productsRef.current;
        const selectedId = lastSelectedRef.current;

        if (!selectedId) return;

        const idx = currentProducts.findIndex(
          (item) => item.id !== selectedId && item.quantity > 0
        );
        const suggest = currentProducts[idx];
        if (!suggest) return;

        const discounted = Math.round(suggest.cost * 0.95);
        alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
        setProducts((prev) => {
          const next = [...prev];
          next[idx] = { ...next[idx], cost: discounted };
          return next;
        });
      }, 60_000);

      return () => clearInterval(suggestInterval);
    }, Math.random() * 20_000);
    console.log("event set");
    return () => {
      clearTimeout(lightningTimeout);
      clearTimeout(suggestTimeout);
    };
  }, []);

  /* ============ 무한루프나 무한 인터벌에서 벗어나지 못해 결국 GPT에 도움을 받은 부분 ============ */

  const value = useMemo(
    () => ({ products, setProducts, lastSelected, setLastSelected }),
    [products, setProducts, lastSelected, setLastSelected]
  );
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
