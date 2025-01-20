// components/Button/Button.js
import React from 'react';
import './Button.css';

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button' }) => {
  return (
    <button 
      className={`button ${variant} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;