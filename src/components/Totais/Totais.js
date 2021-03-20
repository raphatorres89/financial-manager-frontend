import React from "react";
import { dinheiro } from "./../../utils/Formatador";
import { Segment, Statistic } from "semantic-ui-react";

export default function Totais({ totais }) {
  return (
    <Segment>
      <Statistic.Group widths="three" size="small">
        <Statistic color="red">
          <Statistic.Label>Despesas</Statistic.Label>
          <Statistic.Value>{dinheiro(totais.despesas)}</Statistic.Value>
        </Statistic>
        <Statistic color="green">
          <Statistic.Label>Receitas</Statistic.Label>
          <Statistic.Value>{dinheiro(totais.receitas)}</Statistic.Value>
        </Statistic>
        <Statistic
          color={totais.receitas - totais.despesas >= 0 ? "green" : "red"}
        >
          <Statistic.Label>Total</Statistic.Label>
          <Statistic.Value>
            {dinheiro(totais.receitas - totais.despesas)}
          </Statistic.Value>
        </Statistic>
      </Statistic.Group>
    </Segment>
  );
}
