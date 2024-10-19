
import React from 'react';
import './input.css';

export interface InputProps {
  placeholder: string;
  type?: string;
}

export const Input: React.FC<InputProps> = ({ placeholder, type = 'text' }) => {
  return <input className="input" type={type} placeholder={placeholder} />;
};
