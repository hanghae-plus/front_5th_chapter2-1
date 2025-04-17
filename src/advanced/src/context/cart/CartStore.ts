import { useCallback, useMemo, useState } from 'react';
import { CartItem } from '../../types';
import { products } from '../../constants';

export const useCartStore = () => {
    const [cartItems, setCartItems] = useState<CartItem[] | []>([]);

    /** 기존 상품 수량과 장바구니 수량을 비교해 재고를 확인합니다 */
    const hasStock = (cartItems: CartItem) => {
        const filteredProduct = products.filter((product) => product.id === cartItems.productId);

        return filteredProduct[0].quantity - cartItems.cartQuantity > 0;
    };

    /** 장바구니에 새로운 상품을 새로 추가 합니다*/
    const addNewCartItem = useCallback((id: CartItem['productId']) => {
        const currentItem = products.filter((product) => product.id === id);
        return setCartItems((prev) => [...prev, { productId: currentItem[0].id, cartQuantity: 1 }]);
    }, []);

    const removeCartItem = useCallback((id: CartItem['productId']) => {
        return setCartItems((prev) => prev.filter((item) => item.productId !== id));
    }, []);

    /** 장바구니에 있는 상품의 수량을 증가시킵니다 */
    const increaseItemQuantity = useCallback(
        (id: CartItem['productId']) => {
            const _cartItems = cartItems.map((item) => {
                if (item.productId !== id) {
                    return item;
                }
                if (hasStock(item)) {
                    return { ...item, cartQuantity: item.cartQuantity + 1 };
                }
                alert('재고가 부족합니다.');
                return item;
            });

            setCartItems(_cartItems);
        },
        [cartItems]
    );

    /** 장바구니에 있는 상품의 수량을 감소시킵니다 */
    const decreaseItemQuantity = useCallback((id: string) => {
        setCartItems((prev) =>
            prev
                .map((item) => {
                    if (item.productId !== id) {
                        return item;
                    }

                    if (item.cartQuantity > 1) {
                        return { ...item, cartQuantity: item.cartQuantity - 1 };
                    }

                    return null;
                })
                .filter((item): item is CartItem => item !== null)
        );
    }, []);

    const cartValue = useMemo(() => {
        return { cartItems, addNewCartItem, removeCartItem, increaseItemQuantity, decreaseItemQuantity };
    }, [cartItems, addNewCartItem, removeCartItem, increaseItemQuantity, decreaseItemQuantity]);

    return cartValue;
};
