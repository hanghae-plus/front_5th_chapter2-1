import React from "react";

interface WrapperProps {
    children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
            {children}
        </div>
    );
};

export default Wrapper;
