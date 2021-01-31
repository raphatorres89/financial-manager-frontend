export const mockDespesas = () => [
    {
        id: 1,
        nome: 'Nubank',
        valor: 1000.0,
        vencimento: '2021-01-09',
        isPago: false,
        isMedia: false,
        parcela: '',
    },
    {
        id: 2,
        nome: 'Hiper',
        valor: 200.33,
        vencimento: '2021-01-15',
        isPago: false,
        isMedia: true,
        parcela: '',
    },
    {
        id: 3,
        nome: 'Caixa',
        valor: 800.0,
        vencimento: '2021-01-31',
        isPago: true,
        isMedia: false,
        parcela: '1/3',
    },
];

export const mockReceitas = () => [
    {
        id: 4,
        nome: 'Salário X',
        valor: 6300.0,
        isMedia: true,
    },
    {
        id: 5,
        nome: 'Salário Y',
        valor: 800.0,
        isMedia: true,
    },
    {
        id: 6,
        nome: 'PicPay',
        valor: 20.0,
        isMedia: false,
    },
];
