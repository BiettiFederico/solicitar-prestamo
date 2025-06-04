export const GENEROS = [
  { value: "", label: "Selecciona género" },
  { value: "F", label: "Femenino" },
  { value: "M", label: "Masculino" },
  { value: "X", label: "No binario / Otro" },
];

export const TIPOS_TELEFONO = [
  { value: "", label: "Tipo de teléfono" },
  { value: "CE", label: "Celular" },
  { value: "FI", label: "Fijo" },
];

export const TELEFONO_REGEX = /^[0-9]{8,15}$/;
export const DNI_MAX_LENGTH = 8;