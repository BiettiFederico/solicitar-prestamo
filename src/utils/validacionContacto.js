export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function parseFecha(fecha) {
  if (!fecha) return null;
  let d, m, y;
  if (/^\d{8}$/.test(fecha)) {
    d = fecha.slice(0, 2);
    m = fecha.slice(2, 4);
    y = fecha.slice(4, 8);
  } else {
    [d, m, y] = fecha.split("/");
  }
  if (!d || !m || !y) return null;
  return new Date(`${y}-${m}-${d}`);
}

export function formatFecha(date) {
  if (!date) return "";
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

export function calcularEdad(fecha) {
  const date = parseFecha(fecha);
  if (!date || isNaN(date.getTime())) return 0;
  const hoy = new Date();
  let edad = hoy.getFullYear() - date.getFullYear();
  const m = hoy.getMonth() - date.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < date.getDate())) {
    edad--;
  }
  return edad;
}

export function isEdadValida(fecha) {
  const edad = calcularEdad(fecha);
  return edad >= 18 && edad <= 90;
}

export function validarDni(dni) {
  return /^[0-9]{7,8}$/.test(dni);
}

export function nombreValido(nombre) {
  return nombre && !/\d/.test(nombre.trim());
}

// Teléfono: 8 a 15 dígitos
export function telefonoValido(telefono) {
  return telefono && /^[0-9]{8,15}$/.test(telefono.replace(/\D/g, ""));
}

export function formatearFechaInput(valor) {
  let value = valor.replace(/\D/g, "");
  if (value.length > 2 && value.length <= 4) {
    value = value.slice(0, 2) + "/" + value.slice(2);
  } else if (value.length > 4) {
    value =
      value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4, 8);
  }
  return value;
}
