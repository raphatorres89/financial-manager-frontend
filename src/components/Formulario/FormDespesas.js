import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Confirm,
  Form,
  Input,
  Item,
} from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { parseISO } from 'date-fns';
import { dataAmericana } from './../../utils/Formatador';

export default function FormDespesas({
  data,
  save,
  update,
  deletar,
  setCadastroOpen,
  movimentoSelecionado,
}) {
  const [open, setOpen] = useState(false);
  const currentDate = data;
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const despesaDefault = {
    nome: '',
    valor: '0.00',
    vencimento: undefined,
    parcela: '',
    isPago: false,
    isMedia: false,
    tipo: 'DESPESA',
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string()
      .min(2, 'Nome muito pequeno')
      .max(99, 'Nome muito grande')
      .required('Nome é obrigatório'),
    valor: Yup.number()
      .min(0.01, 'Valor deve ser maior que 0,00')
      .max(9999.99, 'Valor deve ser menor que 9.999,99')
      .required('Valor é obrigatório'),
    parcela: Yup.string()
      .trim()
      .matches(/\b\d{1,2}\/\d{1,2}\b/, 'Formato deve ser, por exemplo: 1/3')
      .nullable(),
    vencimento: Yup.date()
      .min(firstDay, 'Vencimento não pode ser menor que o mês atual')
      .max(lastDay, 'Vencimento não pode exceder o mês atual'),
  });

  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    touched,
    values,
    errors,
  } = useFormik({
    initialValues: movimentoSelecionado || despesaDefault,
    validationSchema,
    onSubmit: async (values) => {
      values.tipo = 'DESPESA';
      if (values.id) {
        await update(values);
      } else {
        await save(values);
      }
      setCadastroOpen(false);
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field
        required
        control={Input}
        label="Nome"
        type="text"
        placeholder="Ex.: Conta de luz"
        id="nome"
        name="nome"
        value={values.nome}
        onChange={handleChange}
        error={
          touched.nome && errors.nome
            ? { content: errors.nome, pointing: 'above' }
            : null
        }
      />
      <Form.Group widths="equal">
        <Form.Field
          required
          control={SemanticDatepicker}
          name="vencimento"
          label="Vencimento"
          placeholder="DD/MM/YYYY"
          value={values.vencimento ? parseISO(values.vencimento) : ''}
          locale="pt-BR"
          format="DD/MM/YYYY"
          minDate={firstDay}
          maxDate={lastDay}
          onChange={(_, dataSelecionada) => {
            if (dataSelecionada.value) {
              values.vencimento = dataAmericana(dataSelecionada.value);
            } else {
              values.vencimento = '';
            }
          }}
          error={
            touched.vencimento && errors.vencimento
              ? { content: errors.vencimento, pointing: 'above' }
              : null
          }
        />
        <Form.Field
          control={Input}
          label="Parcela"
          type="text"
          placeholder="Parcela"
          id="parcela"
          name="parcela"
          value={values.parcela}
          onChange={handleChange}
          error={
            touched.parcela && errors.parcela
              ? { content: errors.parcela, pointing: 'above' }
              : null
          }
        />
      </Form.Group>

      <Form.Field
        label="Valor"
        name="valor"
        control="input"
        type="number"
        max={9999.99}
        min={0.01}
        step={0.01}
        onChange={handleChange}
        value={values.valor}
        error={
          touched.valor && errors.valor
            ? { content: errors.valor, pointing: 'above' }
            : null
        }
        required
      />
      <Form.Field>
        <Checkbox
          inline="true"
          id="isMedia"
          name="isMedia"
          label="Valor médio"
          checked={values.isMedia}
          onChange={(e, { name, checked }) => setFieldValue(name, !!checked)}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          inline="true"
          id="isPago"
          name="isPago"
          label="Pago"
          checked={values.isPago}
          onChange={(e, { name, checked }) => setFieldValue(name, !!checked)}
        />
      </Form.Field>
      <Item.Group>
        <Item>
          <Item.Content>
            <Item.Extra>
              <Button floated="right" type="submit" primary>
                Salvar
              </Button>
              {movimentoSelecionado && (
                <>
                  <Button
                    floated="right"
                    color="red"
                    onClick={(event) => {
                      event.preventDefault();
                      setOpen(true);
                    }}
                  >
                    Excluir
                  </Button>
                  <Confirm
                    header="Excluir despesa"
                    content={values.nome}
                    cancelButton="Cancelar"
                    confirmButton="Excluir"
                    open={open}
                    onCancel={() => setOpen(false)}
                    onConfirm={() => {
                      deletar(values);
                      setOpen(false);
                    }}
                  />
                </>
              )}
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Form>
  );
}
