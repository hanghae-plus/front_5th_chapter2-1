import React, {PropsWithChildren, useCallback, useMemo, useState} from "react"
import { Product } from "../types"
import { ProductsContext } from "../context/ProductContext"

export const ProductProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [products, setProducts] = useState<Product[]>(() => [
        {
            id: "p1",
            name: "상품1",
            price: 10000,
            quantity: 50,
            cart: 0,
            originalQuantity: 50,
        },
        {
            id: "p2",
            name: "상품2",
            price: 20000,
            quantity: 30,
            cart: 0,
            originalQuantity: 30,
        },
        {
            id: "p3",
            name: "상품3",
            price: 30000,
            quantity: 20,
            cart: 0,
            originalQuantity: 20,
        },
        {
            id: "p4",
            name: "상품4",
            price: 15000,
            quantity: 0,
            cart: 0,
            originalQuantity: 0,
        },
        {
            id: "p5",
            name: "상품5",
            price: 25000,
            quantity: 10,
            cart: 0,
            originalQuantity: 10,
        },
    ])

    const updateQuantity = useCallback((id: string, quantity:number) => {
        let updateProduct = products.find(prod => prod.id === id) as Product
        if (updateProduct.quantity <= 0) {
            alert("재고가 부족합니다.");
            return;
        }
        updateProduct = {...updateProduct, quantity: updateProduct.quantity - quantity, cart: updateProduct.cart + quantity}
        const newProductList = products.map((prod) => {
            if (updateProduct.id === prod.id) {
                return updateProduct;
            }
            return prod;
        });
        setProducts(newProductList)
    }, [products])

    const resetQuantity = useCallback((id: string) => {
        const newProductList = products.map((prod) => {
            if (id === prod.id) {
              return {
                ...prod,
                quantity: prod.originalQuantity,
                cart: 0,
              };
            }
            return prod;
          });
          setProducts(newProductList);
    }, [products])

    const productsContextValue = useMemo(
        () => ({
            products,
            updateQuantity,
            resetQuantity
        }),
        [products]
    )


    return (
        <ProductsContext.Provider value={productsContextValue}>
            {children}
        </ProductsContext.Provider>
    )
}