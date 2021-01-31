import React, { useState } from 'react';
import DespesasView from './DespesasView';

export default function Despesas({ tabelaDespesas, setDespesas }) {
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
    <DespesasView
      {...{
        open,
        setOpen,
        setDespesas,
        tabelaDespesas,
        editar,
        limpar,
        movimentoSelecionado,
      }}
    />
  );
}
