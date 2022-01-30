import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export default function SeletorMes({ data, setData }) {
  function aumentarMes() {
    setData(new Date(data.getFullYear(), data.getMonth() + 1, 1));
  }

  function diminuirMes() {
    setData(new Date(data.getFullYear(), data.getMonth() - 1, 1));
  }

  return (
    <Button.Group>
      <Button icon onClick={diminuirMes}>
        <Icon name="left chevron" />
      </Button>
      <Button>{`${
        data.getUTCMonth() < 11
          ? '0' + (data.getUTCMonth() + 1)
          : data.getUTCMonth() + 1
      }/${data.getUTCFullYear()}`}</Button>
      <Button icon onClick={aumentarMes}>
        <Icon name="right chevron" />
      </Button>
    </Button.Group>
  );
}
