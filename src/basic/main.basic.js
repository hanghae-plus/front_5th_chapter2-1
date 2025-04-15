import { ShoppingList } from "../components/shoppingList.js";
import { alertPromotion1, alertPromotion2 } from "../hooks/setIntervals.js";
import { addCart } from "../hooks/addCart.js";

ShoppingList();
addCart();
alertPromotion1();
alertPromotion2();