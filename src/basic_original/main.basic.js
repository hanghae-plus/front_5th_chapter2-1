import { ShoppingList } from "./src/components/shoppingList.js";
import { alertPromotion1, alertPromotion2 } from "./src/hooks/setIntervals.js";
import { getCartPrice } from "./src/hooks/getCartPrice.js";
import { addCart } from "./src/hooks/addCart.js";
import { DeleteCart } from "./src/hooks/deleteCart.js";

ShoppingList();
getCartPrice();
alertPromotion1();
alertPromotion2();
addCart();
DeleteCart();
