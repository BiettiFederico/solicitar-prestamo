import React from "react";
import "../../assets/css/institucional.css";

function roundToStep(val, min, step) {
  return Math.round((val - min) / step) * step + Number(min);
}

export default function FloatingRange({
  id,
  name,
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  error,
  minLabel,
  midLabel,
  maxLabel,
  ...rest
}) {
  const medio = Math.round((Number(max) + Number(min)) / 2);

  const handleNumberChange = (e) => {
    let newValue = e.target.value;
    if (newValue === "") {
      newValue = "";
    } else {
      newValue = Math.max(Number(min), Math.min(Number(max), Number(newValue)));
    }
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name,
        value: newValue,
      },
    };
    onChange(syntheticEvent);
  };

  return (
    <div className="form-group">
      <label htmlFor={id} style={{ display: "block", marginBottom: 4 }}>
        {label}
      </label>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleNumberChange}
        className="rangeNumberInput"
        style={{
          width: `max(${String(max).length + 2}ch, 50px)`,
          marginBottom: 8,
          display: "block",
        }}
        id={id + "-number"}
        name={name}
      />
      <div style={{ position: "relative", width: "100%" }}>
        <input
          type="range"
          id={id}
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          className="rangeInput"
          {...rest}
        />
        <div className="rangeTicks">
          <span
            style={{ left: "9px" }} // la mitad del ancho del thumb
            onClick={() => onChange({ target: { name, value: min } })}
            className="rangeTick"
            tabIndex={0}
            role="button"
            aria-label={`Seleccionar mínimo (${min})`}
          />
          <span
            style={{ left: "50%" }}
            onClick={() =>
              onChange({
                target: {
                  name,
                  value: roundToStep(
                    (Number(min) + Number(max)) / 2,
                    min,
                    step
                  ),
                },
              })
            }
            className="rangeTick"
            tabIndex={0}
            role="button"
            aria-label={`Seleccionar medio (${Math.round(
              (Number(min) + Number(max)) / 2
            )})`}
          />
          <span
            style={{ right: "-3px" }} // la mitad del ancho del thumb, desde la derecha
            onClick={() => onChange({ target: { name, value: max } })}
            className="rangeTick"
            tabIndex={0}
            role="button"
            aria-label={`Seleccionar máximo (${max})`}
          />
        </div>
      </div>
      <div className="rangeLabels">
        <span>{typeof minLabel !== "undefined" ? minLabel : min}</span>
        <span>{typeof midLabel !== "undefined" ? midLabel : medio}</span>
        <span>{typeof maxLabel !== "undefined" ? maxLabel : max}</span>
      </div>
      {error && <div className="mensaje-error">{error}</div>}
    </div>
  );
}
