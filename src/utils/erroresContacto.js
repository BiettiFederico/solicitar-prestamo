import { isValidEmail, isEdadValida, validarDni } from "./validacionContacto";
import { TELEFONO_REGEX } from "../constants/contacto";

export function getNombreError(nombre, touched, submit) {
  const nombreValido = nombre && !/^\d+$/.test(nombre.trim());
  if ((touched || submit) && !nombreValido) return "El nombre no puede contener números";
  return "";
}

export function getEmailError(email, touched, submit) {
  if ((touched || submit) && email && !isValidEmail(email)) return "El correo electrónico no es válido";
  return "";
}

export function getEdadError(fecha, touched, submit) {
  if ((touched || submit) && fecha && !isEdadValida(fecha)) return "Ingresa una fecha de nacimiento válida";
  return "";
}

export function getDniError(dni, touched, submit) {
  if ((touched || submit) && dni && !validarDni(dni)) return "El DNI ingresado no es válido";
  return "";
}

export function getTelefonoError(telefono, touched, submit) {
  const valido = telefono && TELEFONO_REGEX.test(telefono.replace(/\D/g, ""));
  if ((touched || submit) && !valido) return "El teléfono debe tener entre 8 y 15 números";
  return "";
}