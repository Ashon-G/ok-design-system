// src/components/Checkbox/Checkbox.tsx
import React from 'react';
import './checkbox.css';

interface CheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <label className="container">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="checkmark" />
      {label}
    </label>
  );
};

export default Checkbox;
