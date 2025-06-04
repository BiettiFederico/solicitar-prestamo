import React from "react";

export default function FloatingSelect({
  id,
  name,
  value,
  onChange,
  label,
  options,
  error,
  ...rest
}) {
  return (
    <div className="floating-label-group">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <option value="" disabled hidden></option>
        {options.map((opt) => (
          <option key={opt.value ?? opt.code} value={opt.value ?? opt.code}>
            {opt.label ?? opt.description ?? opt.name}
          </option>
        ))}
      </select>
      <label htmlFor={id}>{label}</label>
      {error && (
        <div className="mensaje-error" id={`${id}-error`}>
          {error}
        </div>
      )}
    </div>
  );
}