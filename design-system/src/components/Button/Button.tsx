
import React from 'react';
import './button.css';

export interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, variant = 'primary', onClick }) => {
  return (
    <button className={`button-base button-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
};
