import { useState } from "react";

export function useFormHandlers(INIT_STATE, MONTO_MAXIMO_FACTOR) {
  const [form, setForm] = useState(INIT_STATE);
  const [paso, setPaso] = useState(1);
  const [mensajeExito, setMensajeExito] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => setPaso((p) => p + 1);

  const handleBack = () => setPaso((p) => p - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensajeExito("¡Solicitud enviada con éxito!");
    setForm(INIT_STATE);
    setPaso(1);
    // Acá debería mandar el json a un mail sender que tengan.
  };

  const montoMaximo = form.salario ? form.salario / MONTO_MAXIMO_FACTOR : 0;

  return {
    form,
    paso,
    mensajeExito,
    handleChange,
    handleNext,
    handleBack,
    handleSubmit,
    montoMaximo,
    setForm,
    setPaso,
    setMensajeExito,
  };
}