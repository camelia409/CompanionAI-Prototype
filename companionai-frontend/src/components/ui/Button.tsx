// src/components/ui/Button.tsx
import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <button
      className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
