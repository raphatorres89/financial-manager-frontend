import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { data, dinheiro } from './../../utils/Formatador';
import TabelaView from './TabelaView';

export default function Tabela({ dados, editar }) {
  const [openConfirm, setOpenConfirm] = useState(false);

  function formatValue(value, tipo, isMedia) {
    if (tipo === 'number') {
      return isMedia ? `± ${dinheiro(value)}` : dinheiro(value);
    } else if (tipo === 'date') {
      return data(value);
    } else if (tipo === 'icon') {
      return value ? <Icon color="green" name="checkmark" size="large" /> : '';
    }
    return value;
  }

  function renderFooter(field) {
    if (field === 'Valor') {
      return (
        <strong>
          {dinheiro(
            dados.movimentos
              .map((movimento) => movimento.valor)
              .reduce((a, b) => a + b)
          )}
        </strong>
      );
    }
  }

  return (
    <TabelaView
      {...{
        dados,
        formatValue,
        renderFooter,
        editar,
        openConfirm,
        setOpenConfirm,
      }}
    />
  );
}
