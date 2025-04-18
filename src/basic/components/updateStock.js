export function updateStockInfo(productList, parentElement) {
    let stockMessage = "";
    productList.forEach(function (item) {
        if (item.q < 5) {
            stockMessage +=
                item.name +
                ": " +
                (item.q > 0 ? "재고 부족 (" + item.q + "개 남음)" : "품절") +
                "\n";
        }
    });
    parentElement.textContent = stockMessage;
}
