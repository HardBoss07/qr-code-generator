/**
 * qr-code.tsx
 * @author Matteo Bosshard
 * @version 13.03.2025
 */

import React from 'react';

type ButtonComponentProps = {
  onClick: () => void;
  label: string;
}

const ButtonComponent: React.FC<ButtonComponentProps>= ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      {label}
    </button>
  );
};

export default ButtonComponent;