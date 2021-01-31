import React from 'react';
import { Container } from 'semantic-ui-react';
import ModalCadastro from '../ModalCadastro/ModalCadastro';
import Tabela from '../Tabela/Tabela';
import FormDespesas from './components/FormDespesas';

export default function DespesasView({
  open,
  setOpen,
  editar,
  limpar,
  setDespesas,
  tabelaDespesas,
  movimentoSelecionado,
}) {
  const despesas = tabelaDespesas.movimentos;
  const formulario = (
    <FormDespesas
      {...{ despesas, setDespesas, setOpen, movimentoSelecionado }}
    />
  );
  const titulo = 'Adicionar despesa';
  return (
    <Container>
      <Tabela {...{ dados: tabelaDespesas, editar }} />
      <ModalCadastro {...{ open, setOpen, titulo, formulario, limpar }} />
    </Container>
  );
}
