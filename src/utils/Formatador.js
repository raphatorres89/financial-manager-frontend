export function dinheiro(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

export function dataBrasileira(valor) {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(valor));
}

export function dataAmericana(valor) {
  const ano = new Intl.DateTimeFormat('pt', {
    year: 'numeric',
  }).format(valor);
  const mes = new Intl.DateTimeFormat('pt', {
    month: '2-digit',
  }).format(valor);
  const dia = new Intl.DateTimeFormat('pt', {
    day: '2-digit',
  }).format(valor);
  return `${ano}-${mes}-${dia}`;
}
