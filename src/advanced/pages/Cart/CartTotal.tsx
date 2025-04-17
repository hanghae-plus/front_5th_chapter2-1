import React from "react";
import { ProductInfo, ProductOption } from "../Util/StockStatus";
import { Header } from "../Util/Header";
import { CartContainer } from "./CartContainer";
import { useState } from "react";
import { AddButton } from "../Util/ButtonAddToCart";
import { CartItemList } from "./CartItemList";
import { OUT_OF_STOCKS, PRODUCTS } from "../../context/product";
import { PRODUCT } from "../../context/interface";
import { CART_ITEM } from "../../context/interface";
import { CartPrice } from "./CartPrice";
import { useSaleAlerts } from "../../services/AlertSales";

function CartTotal (){

    //현재 선택 중인 품목
    const [selectItemId, setSelectItemId] = useState('p1');

    const [product, setProduct] = useState<PRODUCT[]>(PRODUCTS);

    //장바구니에 담아둔 품목 리스트
    const [cartItems, setCartItems] = useState<CART_ITEM[]>([]);


    //세일 alert
    useSaleAlerts({
        products: PRODUCTS,
        setProducts: setProduct,
        lastSelectedId: selectItemId,
    });
      

    const handleProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectItemId(e.target.value);
    }

    const handleQtyChange = (id: string, change: number) => {
        const product = PRODUCTS.find((p) => p.id === id);
        if (!product) return;
    
        const existingItem = cartItems.find((item) => item.id === id);
        if (!existingItem) return;


        const currentQty = existingItem?.qty || 0;
        const newQty = currentQty + change;
    
        if (newQty <= 0) {
            handleRemoveQty(id);
            return;
        }
    
        if (newQty > product.stock) {
            alert(OUT_OF_STOCKS);
            return;
        }
    
        const updatedCart = existingItem
            ? cartItems.map((item) =>
                  item.id === id ? { ...item, qty: newQty } : item
              )
            : [...cartItems, { id: product.id, name: product.name, price: product.price, qty: newQty }];
    
        setCartItems(updatedCart);
    };
    
    const handleRemoveQty = (id: string) => {
        const newCartItems = cartItems.filter((item) => item.id !== id);
        setCartItems(newCartItems);
    };
    

    return (
        <CartContainer>
            <Header/>
            <CartItemList items={cartItems} onChangeItem={handleQtyChange} onRemoveItem={handleRemoveQty}/>
            <CartPrice cartItems={cartItems} products={product}/>
            <ProductOption selectItemId={selectItemId} onChange={handleProduct} product={product}/>
            <AddButton
                product={product}
                selectItemId={selectItemId} 
                cartItems={cartItems} 
                setCartItems={setCartItems}/>
            <ProductInfo product={product}/>
        </CartContainer>
    )
}

export {CartTotal};