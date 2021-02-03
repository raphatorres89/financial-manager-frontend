import React, { useEffect, useState } from 'react';
import { Tab } from 'semantic-ui-react';
import FormDespesas from './Formulario/FormDespesas';
import FormReceitas from './Formulario/FormReceitas';
import ManagerView from './ManagerView';
import API from './Provider/MovimentoProvider';

export default function Manager() {
  const [movimentos, setMovimentos] = useState(null);
  const [cadastroOpen, setCadastroOpen] = useState(false);
  const [movimentoSelecionado, setMovimentoSelecionado] = useState(null);

  useEffect(() => {
    API.findAll().then((res) => {
      setMovimentos(res.data);
    });
  }, []);

  function filterMovimentos(tipo) {
    if (movimentos) {
      return movimentos.filter((mov) => mov.tipo === tipo);
    }
    return null;
  }

  const estruturaDespesas = {
    color: 'red',
    labels: [
      { name: 'nome', field: 'Nome', tipo: 'string', align: 'left' },
      { name: 'parcela', field: 'Parcela', tipo: 'string', align: 'center' },
      {
        name: 'vencimento',
        field: 'Vencimento',
        tipo: 'date',
        align: 'right',
      },
      { name: 'valor', field: 'Valor', tipo: 'number', align: 'right' },
      { name: 'isPago', field: 'Pago', tipo: 'icon', align: 'center' },
    ],
    movimentos: filterMovimentos('DESPESA'),
  };

  const estruturaReceitas = {
    color: 'green',
    labels: [
      { name: 'nome', field: 'Nome', tipo: 'string', align: 'left' },
      { name: 'parcela', field: 'Parcela', tipo: 'string', align: 'center' },
      { name: 'valor', field: 'Valor', tipo: 'number', align: 'right' },
    ],
    movimentos: filterMovimentos('RECEITA'),
  };

  function abrirModal(movimento) {
    setCadastroOpen(true);
    setMovimentoSelecionado(movimento);
  }

  function limpar() {
    setMovimentoSelecionado(null);
  }

  async function save(values) {
    const novoMovimento = await API.save(values);
    setMovimentos([...movimentos, novoMovimento]);
  }

  async function update(values) {
    await API.update(values.id, values);
    const movimentosAlterados = movimentos.map((mov) => {
      if (mov.id === values.id) {
        return values;
      } else {
        return mov;
      }
    });
    setMovimentos([...movimentosAlterados]);
  }

  async function deletar(movimento) {
    API.delete(movimento.id);
    setCadastroOpen(false);
    const movimentosFiltrados = movimentos.filter(
      (mov) => mov.id !== movimento.id
    );
    setMovimentos([...movimentosFiltrados]);
  }

  const formDespesas = (
    <FormDespesas
      {...{ save, update, deletar, setCadastroOpen, movimentoSelecionado }}
    />
  );
  const formReceitas = (
    <FormReceitas
      {...{ save, update, deletar, setCadastroOpen, movimentoSelecionado }}
    />
  );

  const panes = [
    {
      menuItem: 'Despesas',
      render: () => (
        <Tab.Pane>
          <ManagerView
            {...{
              estrutura: estruturaDespesas,
              formulario: formDespesas,
              abrirModal,
              cadastroOpen,
              setCadastroOpen,
              titulo: 'Despesas',
              limpar,
              movimentoSelecionado,
              setMovimentoSelecionado,
            }}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Receitas',
      render: () => (
        <Tab.Pane>
          <ManagerView
            {...{
              estrutura: estruturaReceitas,
              formulario: formReceitas,
              abrirModal,
              cadastroOpen,
              setCadastroOpen,
              titulo: 'Receitas',
              limpar,
            }}
          />
        </Tab.Pane>
      ),
    },
  ];

  return <Tab panes={panes} />;
}
