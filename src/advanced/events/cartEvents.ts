import { CartItem, Product } from "../types";

// 장바구니 이벤트 관련 함수들
export const cartEvents = {
    addToCart(
        product: Product,
        cartItems: CartItem[],
        setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
        // setLastSelected?: (id: string) => void
    ): void {
        console.log("cartEvent - addToCart");
        // 재고 확인
        if (!product || product.q <= 0) {
            return;
        }

        // 이미 장바구니에 있는지 확인
        const existingItem = cartItems.find((item) => item.id === product.id);
        if (existingItem) {
            // 이미 있는 상품이면 수량 증가
            const updatedItems = cartItems.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setCartItems(updatedItems);
        } else {
            // 새 상품 추가
            const newItem: CartItem = {
                id: product.id,
                product,
                quantity: 1,
            };
            setCartItems([...cartItems, newItem]);
        }
    },
};
