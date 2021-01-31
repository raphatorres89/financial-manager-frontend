import React, { useState, useCallback, useEffect } from 'react';
import { Tab } from 'semantic-ui-react';
import Despesas from './Despesas/Despesas';
import Receitas from './Receitas/Receitas';
import { mockDespesas, mockReceitas } from './../mocks/MovimentosMock';
import MovimentosProvider from './Provider/MovimentoProvider';

export default function Tabs() {
  const [despesas, setDespesas] = useState(mockDespesas);
  const [receitas, setReceitas] = useState(mockReceitas);

  const fetchData = useCallback(async () => {
    const movimentos = await MovimentosProvider.findAll();
    if (movimentos) {
      setDespesas(movimentos.filter(movimento => movimento.tipo === "DESPESA"));
      setReceitas(movimentos.filter(movimento => movimento.tipo === "RECEITA"));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const tabelaDespesas = {
    color: 'red',
    labels: [
      { name: 'nome', field: 'Nome', tipo: 'string', align: 'left' },
      { name: 'parcela', field: 'Parcela', tipo: 'string', align: 'center' },
      { name: 'vencimento', field: 'Vencimento', tipo: 'date', align: 'right' },
      { name: 'valor', field: 'Valor', tipo: 'number', align: 'right' },
      { name: 'isPago', field: 'Pago', tipo: 'icon', align: 'center' },
    ],
    movimentos: despesas,
  };

  const tabelaReceitas = {
    color: 'green',
    labels: [
      { name: 'nome', field: 'Nome', tipo: 'string', align: 'left' },
      { name: 'parcela', field: 'Parcela', tipo: 'string', align: 'center' },
      { name: 'valor', field: 'Valor', tipo: 'number', align: 'right' },
    ],
    movimentos: receitas,
  };

  const panes = [
    {
      menuItem: 'Despesas',
      render: () => (
        <Tab.Pane>
          <Despesas {...{ tabelaDespesas, setDespesas }} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Receitas',
      render: () => (
        <Tab.Pane>
          <Receitas {...{ tabelaReceitas, setReceitas }} />
        </Tab.Pane>
      ),
    },
  ];

  return <Tab panes={panes} />;
}
