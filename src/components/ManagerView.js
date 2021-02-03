import React from 'react';
import { Container } from 'semantic-ui-react';
import Tabela from './Tabela/Tabela';
import ModalCadastro from './ModalCadastro/ModalCadastro';

export default function ManagerView({
  titulo,
  limpar,
  estrutura,
  abrirModal,
  formulario,
  cadastroOpen,
  setCadastroOpen,
  movimentoSelecionado,
  setMovimentoSelecionado,
}) {
  return (
    <Container>
      {estrutura.movimentos && (
        <Tabela
          {...{
            estrutura,
            abrirModal,
            movimentoSelecionado,
            setMovimentoSelecionado,
          }}
        />
      )}
      <ModalCadastro
        {...{ cadastroOpen, setCadastroOpen, titulo, formulario, limpar }}
      />
    </Container>
  );
}
