export function esSalarioValido(salario) {
  return salario && !isNaN(salario) && Number(salario) > 0;
}
