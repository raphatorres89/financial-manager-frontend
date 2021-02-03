import React from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';

export default function TabelaView({
  estrutura,
  formatValue,
  renderFooter,
  abrirModal,
}) {
  return (
    <Table unstackable striped color={estrutura.color}>
      <Table.Header>
        <Table.Row>
          {estrutura.labels.map(({ field, align }) => (
            <Table.HeaderCell key={field} textAlign={align}>
              {field}
            </Table.HeaderCell>
          ))}
          <Table.HeaderCell textAlign="right" width={1}>
            <Icon name="cog" />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {estrutura.movimentos.map((movimento) => (
          <Table.Row key={movimento.nome}>
            {estrutura.labels.map(({ name, tipo, align }) => {
              return (
                <Table.Cell key={name} textAlign={align} collapsing>
                  {formatValue(movimento[name], tipo, movimento.isMedia)}
                </Table.Cell>
              );
            })}
            <Table.Cell textAlign="right" width={1}>
              <Button icon onClick={() => abrirModal(movimento)}>
                <Icon name="pencil" />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          {estrutura[0] && estrutura.labels.map(({ field }) => {
            return (
              <Table.HeaderCell key={field} textAlign="right">
                {renderFooter(field)}
              </Table.HeaderCell>
            );
          })}
          <Table.HeaderCell />
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}
