import React, { createContext, useReducer, useContext } from "react";
import { initialState, rootReducer } from "../reducers/index.js";

// Context 생성
const CartContext = createContext();

// Context Provider 컴포넌트
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

// 커스텀 훅을 통한 Context 사용
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
