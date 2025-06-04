export const formatCurrency = (value) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(
    value || 0
  );

export function calcularCuota(monto, cuotas) {
  if (!monto || !cuotas) return 0;
  return Math.round(monto / cuotas);
}

export function calcularCapacidadPago(salario) {
  return salario ? Number(salario) * 0.3 : 0;
}
