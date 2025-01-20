import React from 'react';
import './Input.css';

const Input = ({ 
  id, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  accept, 
  className = '',
  disabled = false,
  required = false
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      accept={accept}
      className={`input ${className}`}
      disabled={disabled}
      required={required}
    />
  );
};

export default Input;