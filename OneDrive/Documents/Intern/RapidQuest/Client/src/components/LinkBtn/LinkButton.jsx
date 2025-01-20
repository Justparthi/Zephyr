// components/LinkButton/LinkButton.jsx
import React from 'react';
import Button from '../Button/Button.jsx';

const LinkButton = ({ text, url, variant = "primary", className = "" }) => {
  return (
    <div className={`link-button ${className}`}>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`inline-block px-4 py-2 rounded-md text-center ${
          variant === "primary" ? "bg-blue-500 text-white hover:bg-blue-600" : 
          variant === "secondary" ? "bg-gray-200 text-gray-800 hover:bg-gray-300" :
          "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
        }`}
      >
        {text}
      </a>
    </div>
  );
};

export default LinkButton;