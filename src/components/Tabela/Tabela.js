import React from 'react';
import { Icon } from 'semantic-ui-react';
import { dataBrasileira, dinheiro } from './../../utils/Formatador';
import TabelaView from './TabelaView';

export default function Tabela({ estrutura, abrirModal }) {
  function formatValue(value, tipo, isMedia) {
    if (tipo === 'number') {
      return isMedia ? `± ${dinheiro(value)}` : dinheiro(value);
    } else if (tipo === 'date') {
      return dataBrasileira(value);
    } else if (tipo === 'icon') {
      return value ? <Icon color="green" name="checkmark" size="large" /> : '';
    }
    return value;
  }

  function renderFooter(field) {
    if (field && field === 'Valor') {
      return (
        <strong>
          {dinheiro(
            estrutura.movimentos
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
        estrutura,
        abrirModal,
        formatValue,
        renderFooter,
      }}
    />
  );
}
