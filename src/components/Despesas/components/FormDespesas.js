import React from 'react';
import { Button, Checkbox, Form, Input } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MovimentosProvider from './../../Provider/MovimentoProvider';

export default function FormDespesas({
  despesas,
  setDespesas,
  setOpen,
  movimentoSelecionado,
  update,
}) {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const despesaDefault = {
    nome: '',
    valor: '0.00',
    vencimento: null,
    parcela: '',
    isPago: false,
    isMedia: false,
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
        await MovimentosProvider.update(values.id, values);
      } else {
        await MovimentosProvider.save(values);
      }
      setOpen(false);
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field required>
        <label>Nome</label>
        <Form.Input
          type="text"
          placeholder="Conta de luz"
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
      </Form.Field>
      <Form.Group widths="equal">
        <Form.Field required>
          <label>Vencimento</label>
          <Form.Input
            type="date"
            placeholder="Vencimento"
            id="vencimento"
            name="vencimento"
            min={firstDay}
            max={lastDay}
            value={values.vencimento}
            onChange={handleChange}
            error={
              touched.vencimento && errors.vencimento
                ? { content: errors.vencimento, pointing: 'above' }
                : null
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Parcela</label>
          <Form.Input
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
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <Input
          label={{ basic: true, content: 'R$' }}
          labelPosition="left"
          type="number"
          id="valor"
          name="valor"
          min={0.0}
          max={9999.99}
          step={0.01}
          placeholder="0,00"
          value={parseFloat(values.valor).toFixed(2)}
          onChange={handleChange}
          error={
            touched.valor && errors.valor
              ? { content: errors.valor, pointing: 'above' }
              : null
          }
        ></Input>
      </Form.Field>
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
      <Button type="submit">Enviar</Button>
    </Form>
  );
}
