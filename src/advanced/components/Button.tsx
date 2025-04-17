import React from "react";

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger";
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    productId: string;
    dataChange: string;
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    variant = "primary",
    size = "medium",
    disabled = false,
    productId,
    dataChange,
}) => {
    // variant와 size에 따른 스타일 정의
    const getButtonClasses = () => {
        const baseClasses = "text-white rounded";
        const variantClasses = {
            primary: "bg-blue-500", // 추가 버튼
            secondary: "quantity-change bg-blue-500", // -,+ 버튼
            danger: "remove-item bg-red-500 px-2 py-1", // 삭제 버튼
        };
        const sizeClasses = {
            small: "px-2 py-1 mr-1", // -,+ 버튼
            medium: "px-2 py-1", // 삭제 버튼
            large: "px-4 py-2", // 추가 버튼
        };

        return `${baseClasses} ${variantClasses[variant]} ${
            sizeClasses[size]
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;
    };

    return (
        <button
            onClick={onClick}
            className={getButtonClasses()}
            disabled={disabled}
            data-product-id={productId}
            data-change={dataChange}
        >
            {children}
        </button>
    );
};

export default Button;
