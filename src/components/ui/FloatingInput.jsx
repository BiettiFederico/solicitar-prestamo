import React from "react";

export default function FloatingInput({
  id,
  name,
  value,
  onChange,
  onBlur,
  label,
  type = "text",
  error,
  ...rest
}) {
  return (
    <div className="floating-label-group">
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        {...rest}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label htmlFor={id}>{label}</label>
      {error && (
        <div className="mensaje-error" id={`${id}-error`}>
          {error}
        </div>
      )}
    </div>
  );
}
