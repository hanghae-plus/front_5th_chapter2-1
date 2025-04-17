import React from "react";

//상품 정보 
export interface PRODUCT {
    id: string,
    name: string,
    price: number,
    stock: number,
};

export interface OPTION_EVENT{
    selectItemId: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

//장바구니에 담긴 상품
export interface CART_ITEM {
    id: string,
    name: string,
    price: number,
    qty: number,
}

//장바구니에 담긴 상품 수량 증감
export interface CART_ITEM_EVENT{
    item: PRODUCT;
    qty: number;
    onChangeItem: (id: string, change: number) => void;
    onRemoveItem: (id: string) => void;    
}

export interface CART {
    [key: string]: number;
}