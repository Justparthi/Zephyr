import React from 'react';

const Icon = ({ name, className = '', size = 24 }) => {
  const getIcon = () => {
    switch (name) {
      case 'eye':
        return (
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        );
      case 'plus':
        return (
          <path d="M12 4v16m8-8H4" />
        );
      case 'image':
        return (
          <path d="M4 16l4-4 4 4m4-4l4 4M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" />
        );
      case 'type':
        return (
          <path d="M4 7V4h16v3M9 20h6M12 4v16" />
        );
      case 'arrow-up':
        return (
          <path d="M12 19V5m-7 7l7-7 7 7" />
        );
      case 'arrow-down':
        return (
          <path d="M12 5v14m-7-7l7 7 7-7" />
        );
      case 'trash':
        return (
          <path d="M19 7l-3 13H8L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        );
      case 'code':
        return (
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        );
      case 'copy':
        return (
          <path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        );

        case 'link':
          return (
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
          );  
      default:
        return null;
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon ${className}`}
    >
      {getIcon()}
    </svg>
  );
};

export default Icon;