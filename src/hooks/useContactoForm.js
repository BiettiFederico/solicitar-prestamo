import { useState, useEffect, useRef } from "react";
import {
  getNombreError,
  getEmailError,
  getEdadError,
  getDniError,
  getTelefonoError,
  parseFecha,
  isEdadValida,
  validarDni,
  isValidEmail,
} from "../utils/contacto";
import { PROVINCIAS } from "../constants/delegaciones";

export function useContactoForm(form, onSubmit) {
  const [touched, setTouched] = useState({});
  const [fechaDate, setFechaDate] = useState(parseFecha(form.fecha_nacimiento));
  const fechaInputRef = useRef();

  useEffect(() => {
    if (form.fecha_nacimiento && form.fecha_nacimiento.length === 10) {
      const date = parseFecha(form.fecha_nacimiento);
      setFechaDate(date);
    }
  }, [form.fecha_nacimiento]);

  const nombreError = getNombreError(
    form.nombre,
    touched.nombre,
    touched.submit
  );
  const emailError = getEmailError(form.email, touched.email, touched.submit);
  const edadError = getEdadError(
    form.fecha_nacimiento,
    touched.fecha_nacimiento,
    touched.submit
  );
  const dniError = getDniError(form.dni, touched.dni, touched.submit);
  const telefonoError = getTelefonoError(
    form.telefono,
    touched.telefono,
    touched.submit
  );
  const nombreValido = !nombreError;
  const telefonoValido = !telefonoError;

  const delegaciones =
    PROVINCIAS.find((p) => p.code === form.provincia)?.delegaciones || [];

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    setTouched((prev) => ({ ...prev, submit: true }));
    if (
      nombreValido &&
      form.nombre &&
      form.email &&
      isValidEmail(form.email) &&
      form.genero &&
      form.tipo_telefono &&
      telefonoValido &&
      form.fecha_nacimiento &&
      isEdadValida(form.fecha_nacimiento) &&
      form.dni &&
      validarDni(form.dni) &&
      form.provincia &&
      form.delegacion
    ) {
      onSubmit(e);
    }
  };

  return {
    touched,
    fechaDate,
    setFechaDate,
    fechaInputRef,
    nombreError,
    emailError,
    edadError,
    dniError,
    telefonoError,
    nombreValido,
    telefonoValido,
    delegaciones,
    handleBlur,
    handleLocalSubmit,
  };
}
