import React from 'react';

type ButtonComponentProps = {
  onClick: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      Clear QR Code
    </button>
  );
};

export default ButtonComponent;