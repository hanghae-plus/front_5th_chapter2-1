import { useState } from "react";
import { ProductInfo } from "../types/types";

const useCartStoreLogic = (initialCart: ProductInfo[]) => {
  const [productList, setProductList] = useState<ProductInfo[]>(initialCart);
  const [lastSaleItem, setLastSaleItem] = useState<string | null>(null);

  const addToCart = (productId: string) => {
    const itemToAdd = productList.find((p) => p.id === productId);

    if (!itemToAdd || itemToAdd.stock <= 0) {
      alert("재고가 부족합니다.");
      return;
    }

    const existingItem = productList.find((p) => p.id === productId);

    if (existingItem) {
      const newQuantity = (existingItem.quantity || 0) + 1;

      if (newQuantity <= itemToAdd.stock) {
        setProductList(
          productList.map((p) =>
            p.id === productId
              ? {
                  ...p,
                  quantity: newQuantity,
                  stock: p.stock - 1,
                }
              : p,
          ),
        );
        setLastSaleItem(productId);
      } else {
        alert("재고가 부족합니다.");
      }
    } else {
      setProductList([
        ...productList,
        {
          ...itemToAdd,
          quantity: 1,
          stock: itemToAdd.stock - 1,
        },
      ]);
      setLastSaleItem(productId);
    }
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    const item = productList.find((p) => p.id === productId);

    if (!item) return;

    const newQuantity = item.quantity + quantity;

    if (newQuantity <= 0) {
      handleRemove(productId);
      return;
    }

    if (quantity > 0 && item.stock < quantity) {
      alert("재고가 부족합니다.");
      return;
    }

    setProductList(
      productList.map((p) =>
        p.id === productId
          ? {
              ...p,
              quantity: newQuantity,
              stock: p.stock - quantity,
            }
          : p,
      ),
    );
  };

  const handleRemove = (productId: string) => {
    const item = productList.find((p) => p.id === productId);

    if (!item) return;

    setProductList(
      productList.map((p) =>
        p.id === productId
          ? {
              ...p,
              quantity: 0,
              stock: p.stock + item.quantity,
            }
          : p,
      ),
    );
  };

  const changeProductListPrice = (productId: string) => {
    setProductList(
      productList.map((p) =>
        p.id === productId ? { ...p, price: Math.round(p.price * 0.8) } : p,
      ),
    );
  };

  return {
    productList,
    lastSaleItem,
    addToCart,
    handleQuantityChange,
    handleRemove,
    changeProductListPrice,
    setProductList,
    setLastSaleItem,
  };
};

export default useCartStoreLogic;
