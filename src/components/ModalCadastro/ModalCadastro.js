import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

export default function ModalCadastro({
  open,
  setOpen,
  titulo,
  limpar,
  formulario,
}) {
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
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
