import React from 'react';
import '../TextArea/TextArea.css';

const Textarea = ({ 
  id, 
  value, 
  onChange, 
  placeholder, 
  rows = 4,
  className = '',
  disabled = false,
  required = false
}) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`textarea ${className}`}
      disabled={disabled}
      required={required}
    />
  );
};

export default Textarea;