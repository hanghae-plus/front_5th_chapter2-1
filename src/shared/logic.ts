import { Product } from './store/productList';

function deepCopyList(prodList: Product[]): Product[] {
  return prodList.map((prod) => ({
    ...prod,
  }));
}
