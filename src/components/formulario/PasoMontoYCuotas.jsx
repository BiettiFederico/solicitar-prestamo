import React from "react";
import {
  formatCurrency,
  calcularCuota,
  calcularCapacidadPago,
} from "../../utils/calculoMontoYCuotas";
import { MONTO_MINIMO, CUOTAS_MIN, CUOTAS_MAX } from "../../constants/montos";
import FloatingRange from "../ui/FloatingRange";
import Button from "../ui/Button"; // Si tienes un botón institucional
// import MensajeError from "../ui/MensajeError"; // Si decides extraerlo
// import ValorCuota from "../ui/ValorCuota"; // Si decides extraerlo

export default function PasoMontoYCuotas({
  form,
  handleChange,
  montoMaximo,
  onBack,
  onNext,
}) {
  const cuota = calcularCuota(form.monto, form.cuotas);
  const capacidadPago = calcularCapacidadPago(form.salario);
  const superaCapacidad = cuota > capacidadPago;
  const montoInvalido = form.monto < MONTO_MINIMO;

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="titulo-paso">Elige el monto y cuotas</h2>

      <div className="form-group">
        <FloatingRange
          id="monto"
          name="monto"
          value={form.monto}
          min={MONTO_MINIMO}
          max={montoMaximo}
          step={1000}
          onChange={handleChange}
          label="Monto a solicitar:"
          minLabel={formatCurrency(Math.round(MONTO_MINIMO / 1000) * 1000)}
          midLabel={formatCurrency(
            Math.round((MONTO_MINIMO + montoMaximo) / 2 / 1000) * 1000
          )}
          maxLabel={formatCurrency(Math.round(montoMaximo / 1000) * 1000)}
          error={
            montoInvalido
              ? `El monto mínimo es ${formatCurrency(MONTO_MINIMO)}`
              : ""
          }
        />
      </div>

      <div className="form-group">
        <FloatingRange
          id="cuotas"
          name="cuotas"
          value={form.cuotas}
          min={CUOTAS_MIN}
          max={CUOTAS_MAX}
          onChange={handleChange}
          label="Número de cuotas:"
        />
      </div>

      <div className="form-group" style={{ fontWeight: "bold" }}>
        Valor estimado de la cuota: {formatCurrency(cuota)}
      </div>

      {superaCapacidad && (
        <div className="mensaje-error" style={{ marginBottom: 8 }}>
          El valor de la cuota supera tu capacidad de pago (máx:{" "}
          {formatCurrency(capacidadPago)})
        </div>
      )}

      <div className="form-group botones">
        <Button type="button" className="btn-secondary" onClick={onBack}>
          Volver
        </Button>
        <Button
          type="submit"
          className="btn-primary"
          disabled={montoInvalido || superaCapacidad}
        >
          Aceptarrr
        </Button>
      </div>
    </form>
  );
}
