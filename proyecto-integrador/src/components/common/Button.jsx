import React from 'react';

const Button = ({ children, onClick, variant = 'primary', icon: Icon, disabled }) => {
  const getVariantClasses = (variant) => {
    switch (variant) {
      case 'secondary':
        return 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100';
      case 'danger':
        return 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100';
      case 'success':
        return 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-100';
      case 'purple':
        return 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-4 focus:ring-gray-100';
      default: // primary
        return 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100';
    }
  };

  return (
    <button 
      className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${getVariantClasses(variant)} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
        {Icon && <Icon className="h-4 w-4 mr-1.5 flex-shrink-0" />}
        {children}
    </button>
  );
};

export default Button;
