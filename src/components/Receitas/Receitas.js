import React, {useState} from 'react';
import ReceitasView from './ReceitasView';

export default function Receitas({tabelaReceitas, setReceitas}) {
    const [open, setOpen] = useState(false);
    const [movimentoSelecionado, setMovimentoSelecionado] = useState(null);

    function editar(movimento) {
        setOpen(true);
        setMovimentoSelecionado(movimento);
    }

    function limpar() {
        setMovimentoSelecionado(null);
    }

    return (
        <ReceitasView
            {...{
                open,
                setOpen,
                setReceitas,
                tabelaReceitas,
                editar,
                limpar,
                movimentoSelecionado,
            }}
        />
    );
}
