import React, { useState } from "react";
import FloatingInput from "../ui/FloatingInput";
import FloatingSelect from "../ui/FloatingSelect";
import Button from "../ui/Button";
import {
  SITUACIONES,
  BANCOS,
  SALARIO_MINIMO,
} from "../../constants/datosLaborales";
import { esSalarioValido } from "../../utils/validacionDatosLaborales";

const ERROR_SALARIO = "Ingrese el salario neto";

export default function PasoDatosLaborales({ form, handleChange, onNext }) {
  const [touchedSalario, setTouchedSalario] = useState(false);
  const [submitIntento, setSubmitIntento] = useState(false);

  const salarioValido = esSalarioValido(form.salario);
  const mostrarErrorSalario =
    (!salarioValido && touchedSalario) || (!salarioValido && submitIntento);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitIntento(true);
    if (form.situacion && salarioValido && form.banco) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="titulo-paso">Situación laboral</h2>

      <FloatingSelect
        id="situacion"
        name="situacion"
        value={form.situacion}
        onChange={handleChange}
        label="Situación"
        options={SITUACIONES.map((s) => ({
          value: s.code,
          label: s.description,
        }))}
        required
      />

      <FloatingInput
        id="salario"
        name="salario"
        type="number"
        value={form.salario}
        onChange={handleChange}
        onBlur={() => setTouchedSalario(true)}
        label="Salario percibido"
        error={mostrarErrorSalario ? ERROR_SALARIO : ""}
        required
        min={SALARIO_MINIMO}
        autoComplete="off"
      />

      <FloatingSelect
        id="banco"
        name="banco"
        value={form.banco}
        onChange={handleChange}
        label="Banco"
        options={BANCOS.map((b) => ({
          value: b.code,
          label: b.description,
        }))}
        required
      />

      <Button
        type="submit"
        disabled={!form.situacion || !salarioValido || !form.banco}
      >
        Aceptar
      </Button>
    </form>
  );
}
