// 카트 아이템 업데이트 헬퍼 함수
export const updateCartItem = (productId, result) => {
	if (!result) return;

	const cartItemElement = document.getElementById(productId);
	if (!cartItemElement) return;

	if (!result) {
		cartItemElement.remove();
	} else {
		cartItemElement.querySelector('span').textContent = result;
	}
};
