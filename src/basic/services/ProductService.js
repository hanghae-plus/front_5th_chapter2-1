import { ProductSelectItem } from "../components/ProductSelectItem";
import { StockInfo } from "../components/StockInfo";

const PRODUCT_List = [
  { id: "p1", name: "상품1", val: 10000, q: 50 },
  { id: "p2", name: "상품2", val: 20000, q: 30 },
  { id: "p3", name: "상품3", val: 30000, q: 20 },
  { id: "p4", name: "상품4", val: 15000, q: 0 },
  { id: "p5", name: "상품5", val: 25000, q: 10 },
];

export class ProductService {
  constructor() {
    this.productList = PRODUCT_List;
  }

  updateProductList() {
    const productSelector = document.getElementById("product-select");
    productSelector.innerHTML = "";

    this.productList.forEach((item) => {
      const selectItem = ProductSelectItem({
        id: item.id,
        name: item.name,
        price: item.val,
        quantity: item.q,
      });
      productSelector.appendChild(selectItem);
    });
  }

  updateStockInfo() {
    let infoMsg = "";
    this.productList.forEach((item) => {
      infoMsg += StockInfo({
        name: item.name,
        quantityLeft: item.q,
      });
    });

    const stockInfo = document.getElementById("stock-status");
    stockInfo.textContent = infoMsg;
  }
}

export const productService = new ProductService();
