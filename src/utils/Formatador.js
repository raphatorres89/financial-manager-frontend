export function dinheiro(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(valor);
}

export function data(valor) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(valor));
}
