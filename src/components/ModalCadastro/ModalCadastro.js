import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

export default function ModalCadastro({
  cadastroOpen,
  setCadastroOpen,
  titulo,
  formulario,
  limpar,
}) {
  return (
    <Modal
      closeIcon
      onClose={() => setCadastroOpen(false)}
      onOpen={() => setCadastroOpen(true)}
      open={cadastroOpen}
      trigger={
        <Button primary onClick={limpar}>
          Adicionar
        </Button>
      }
    >
      <Modal.Header>{titulo}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{formulario}</Modal.Description>
      </Modal.Content>
    </Modal>
  );
}
