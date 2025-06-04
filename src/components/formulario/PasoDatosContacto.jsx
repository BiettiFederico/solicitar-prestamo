import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FloatingInput from "../ui/FloatingInput";
import FloatingSelect from "../ui/FloatingSelect";
import Button from "../ui/Button"; // Si tienes un botón institucional

import { PROVINCIAS } from "../../constants/delegaciones";
import {
  GENEROS,
  TIPOS_TELEFONO,
  DNI_MAX_LENGTH,
} from "../../constants/contacto";

import {
  parseFecha,
  isEdadValida,
  validarDni,
  isValidEmail,
  handleFechaInput,
  handleFechaChange,
} from "../../utils/contacto";
import { useContactoForm } from "../../hooks/useContactoForm";

export default function PasoDatosContacto({
  form,
  handleChange,
  onBack,
  onSubmit,
}) {
  const {
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
  } = useContactoForm(form, onSubmit);

  useEffect(() => {
    if (form.fecha_nacimiento && form.fecha_nacimiento.length === 10) {
      const date = parseFecha(form.fecha_nacimiento);
      setFechaDate(date);
    }
  }, [form.fecha_nacimiento, setFechaDate]);

  return (
    <form onSubmit={handleLocalSubmit}>
      <h2 className="titulo-paso">Datos de contacto</h2>

      {/* Nombre y Email */}
      <div className="form-group fila-doble">
        <FloatingInput
          id="nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Nombre y apellido"
          error={nombreError}
          required
          autoComplete="off"
        />
        <FloatingInput
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Correo electrónico"
          error={emailError}
          required
          autoComplete="off"
        />
      </div>

      {/* Género y DNI */}
      <div className="form-group fila-doble">
        <FloatingSelect
          id="genero"
          name="genero"
          value={form.genero || ""}
          onChange={handleChange}
          label="Género"
          options={GENEROS}
          required
        />
        <FloatingInput
          id="dni"
          name="dni"
          value={form.dni || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          label="DNI"
          error={dniError}
          required
          maxLength={DNI_MAX_LENGTH}
          autoComplete="off"
        />
      </div>

      {/* Tipo de Teléfono y Teléfono */}
      <div className="form-group fila-doble">
        <FloatingSelect
          id="tipo_telefono"
          name="tipo_telefono"
          value={form.tipo_telefono || ""}
          onChange={handleChange}
          label="Tipo de teléfono"
          options={TIPOS_TELEFONO}
          required
        />
        <FloatingInput
          id="telefono"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Teléfono"
          error={telefonoError}
          required
          autoComplete="off"
        />
      </div>

      {/* Provincia y Delegación */}
      <div className="form-group fila-doble">
        <FloatingSelect
          id="provincia"
          name="provincia"
          value={form.provincia}
          onChange={handleChange}
          label="Provincia"
          options={PROVINCIAS.map((p) => ({
            value: p.code,
            label: p.name,
          }))}
          required
        />
        <FloatingSelect
          id="delegacion"
          name="delegacion"
          value={form.delegacion}
          onChange={handleChange}
          label="Delegación"
          options={delegaciones.map((d) => ({
            value: d.code,
            label: d.name,
          }))}
          required
          disabled={!form.provincia}
        />
      </div>

      {/* Fecha de nacimiento */}
      <div className="form-group fila-doble">
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <FloatingInput
            ref={fechaInputRef}
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            value={form.fecha_nacimiento}
            onChange={(e) => handleFechaInput(e, handleChange, setFechaDate)}
            onBlur={handleBlur}
            label="Fecha de nacimiento"
            error={edadError}
            required
            maxLength={10}
            autoComplete="off"
            style={{ flex: 1 }}
          />
          <DatePicker
            selected={fechaDate}
            onChange={(date) =>
              handleFechaChange(date, handleChange, setFechaDate)
            }
            dateFormat="dd/MM/yyyy"
            placeholderText="Seleccionar"
            maxDate={new Date()}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className="input-fecha"
            required={false}
            customInput={
              <button
                type="button"
                className="fecha-btn-picker"
                style={{
                  marginLeft: 8,
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
              >
                📅
              </button>
            }
          />
        </div>
      </div>

      {/* Botones */}
      <div className="form-group botones">
        <Button type="button" className="btn-secondary" onClick={onBack}>
          Volver
        </Button>
        <Button
          type="submit"
          className="btn-primary"
          disabled={
            !nombreValido ||
            !form.nombre ||
            !form.email ||
            !isValidEmail(form.email) ||
            !form.genero ||
            !form.tipo_telefono ||
            !telefonoValido ||
            !form.fecha_nacimiento ||
            !isEdadValida(form.fecha_nacimiento) ||
            !form.dni ||
            !validarDni(form.dni) ||
            !form.provincia ||
            !form.delegacion
            // || !captchaValue
          }
        >
          Aceptar
        </Button>
      </div>
    </form>
  );
}
