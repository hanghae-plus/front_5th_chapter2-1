import React from 'react';

interface AddButtonProps {
    onClick: () => void;
}

export const AddButton: React.FC<AddButtonProps> = React.memo(({ onClick }) => {
    return (
        <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded">
            추가
        </button>
    );
});
