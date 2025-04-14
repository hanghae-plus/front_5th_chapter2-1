import { createBonusPoints } from "../utils/createElement.js";

// 포인트 계산 로직
export function calculateBonusPoints(totalAmount) {
    return Math.floor(totalAmount / 1000);
}

// 포인트 업데이트
export function updateBonusPointsElement(points, parentElement) {
    console.log("points: ", points);
    console.log("parentElement: ", parentElement);
    let pointsSpan = document.getElementById("loyalty-points");

    if (!pointsSpan) {
        pointsSpan = createBonusPoints();
        parentElement.appendChild(pointsSpan);
    }

    pointsSpan.textContent = `(포인트: ${points})`;
    return pointsSpan;
}

// 포인트 렌더
export function renderBonusPoints(amount, parentElement) {
    console.log("amount: ", amount);
    console.log("parentElement: ", parentElement);

    const points = calculateBonusPoints(amount);
    return updateBonusPointsElement(points, parentElement);
}
