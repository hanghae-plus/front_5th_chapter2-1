import React from "react";

interface ContainerProps {
    children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
    return <div className="bg-gray-100 p-8">{children}</div>;
};

export default Container;
