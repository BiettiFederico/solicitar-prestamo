import { formatearFechaInput, parseFecha, formatFecha } from "./validacionContacto";

export function handleFechaInput(e, handleChange, setFechaDate) {
  const value = formatearFechaInput(e.target.value);
  handleChange({
    target: {
      name: "fecha_nacimiento",
      value,
    },
  });

  // Si ya tiene 10 caracteres (dd/mm/aaaa), actualiza el DatePicker
  if (value.length === 10) {
    const soloNumeros = value.replace(/\D/g, "");
    const date = parseFecha(soloNumeros);
    setFechaDate(date);
  }
}

export function handleFechaChange(date, handleChange, setFechaDate) {
  setFechaDate(date);
  handleChange({
    target: {
      name: "fecha_nacimiento",
      value: formatFecha(date),
    },
  });
}