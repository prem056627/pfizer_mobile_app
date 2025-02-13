import React from 'react';

const CheckboxField = ({
  label,
  name,
  id,
  checked,
  onChange,
  onBlur,
  error,
  className = ''
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
      />
      <label 
        htmlFor={id}
        className="text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default CheckboxField;