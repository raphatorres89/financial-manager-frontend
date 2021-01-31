import React from 'react';
import { Button, Confirm, Grid, Icon, Popup, Table } from 'semantic-ui-react';
import MovimentoProvider from './../Provider/MovimentoProvider';

export default function TabelaView({
  dados,
  formatValue,
  renderFooter,
  editar,
  openConfirm,
  setOpenConfirm,
}) {
  return (
    <Table unstackable striped color={dados.color}>
      <Table.Header>
        <Table.Row>
          {dados.labels.map(({ field, align }) => (
            <Table.HeaderCell key={field} textAlign={align}>
              {field}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {dados.movimentos.map((movimento) => (
          <Popup
            key={movimento.nome}
            position="bottom center"
            on="click"
            trigger={
              <Table.Row key={movimento.nome}>
                {dados.labels.map(({ name, tipo, align }) => {
                  return (
                    <Table.Cell key={name} textAlign={align}>
                      {formatValue(movimento[name], tipo, movimento.isMedia)}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            }
            content={
              <Grid centered>
                <Grid.Column textAlign="center">
                  <Button
                    icon
                    basic
                    color="blue"
                    onClick={() => editar(movimento)}
                  >
                    <Icon name="pencil" />
                  </Button>
                  <Button
                    icon
                    basic
                    color="red"
                    onClick={() => setOpenConfirm(true)}
                  >
                    <Icon name="trash" />
                  </Button>
                  <Confirm
                    header="Deletar movimento"
                    content={`Deseja deletar o movimento ${movimento.nome}?`}
                    cancelButton="Cancelar"
                    confirmButton="Deletar"
                    open={openConfirm}
                    onCancel={setOpenConfirm(false)}
                    onConfirm={() => {
                      MovimentoProvider.delete(movimento.id);
                      setOpenConfirm(false);
                    }}
                  />
                </Grid.Column>
              </Grid>
            }
          />
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          {dados.labels.map(({ field }) => {
            return (
              <Table.HeaderCell key={field} textAlign="right">
                {renderFooter(field)}
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}
