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
        console.log(product);
        // 재고 확인
        if (!product || product.q <= 0) {
            alert("해당 상품의 재고가 없습니다.");
            return;
        }

        // 이미 장바구니에 있는지 확인
        const existingItem = cartItems.find((item) => item.id === product.id);
        if (existingItem) {
            // 수량 증가 시 재고 확인 추가
            if (existingItem.quantity + 1 > product.q) {
                alert("재고가 부족합니다.");
                return;
            }

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

    updateQuantity(
        productId: string,
        change: number,
        cartItems: CartItem[],
        setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
    ): void {
        const updatedItems = cartItems
            .map((item) => {
                if (item.id === productId) {
                    const newQuantity = item.quantity + change;

                    // 수량이 0 이하면 null 반환 (나중에 필터링)
                    if (newQuantity <= 0) {
                        return null;
                    }

                    // 재고 체크
                    if (newQuantity > item.product.q) {
                        alert("재고가 부족합니다.");
                        return item;
                    }

                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
            .filter(Boolean) as CartItem[]; // null 항목 필터링

        setCartItems(updatedItems);
    },

    // 상품 제거 함수 추가
    removeItem(
        productId: string,
        cartItems: CartItem[],
        setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
    ): void {
        const updatedItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedItems);
    },
};
