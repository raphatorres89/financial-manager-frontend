import React from 'react';
import { Segment, Statistic } from 'semantic-ui-react';

export default function Totais({ movimentos }) {
  return (
    <Segment>
      <Statistic.Group widths="three">
        <Statistic>
          <Statistic.Label>Despesas</Statistic.Label>
          <Statistic.Value>somar</Statistic.Value>
        </Statistic>
        <Statistic>
          <Statistic.Label>Receitas</Statistic.Label>
          <Statistic.Value>somar</Statistic.Value>
        </Statistic>
        <Statistic>
          <Statistic.Label>Total</Statistic.Label>
          <Statistic.Value>calcular</Statistic.Value>
        </Statistic>
      </Statistic.Group>
    </Segment>
  );
}
