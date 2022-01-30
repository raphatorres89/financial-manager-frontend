import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Confirm,
  Form,
  Input,
  Item,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { dataAmericana } from "./../../utils/Formatador";

export default function FormReceitas({
  data,
  save,
  update,
  deletar,
  setCadastroOpen,
  movimentoSelecionado,
}) {
  const [open, setOpen] = useState(false);

  const receitaDefault = {
    nome: "",
    valor: "0.00",
    parcela: "",
    isMedia: false,
    isPago: false,
    vencimento: dataAmericana(data),
    tipo: "RECEITA",
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string()
      .min(2, "Nome muito pequeno")
      .max(99, "Nome muito grande")
      .required("Nome é obrigatório"),
    valor: Yup.number()
      .min(0.01, "Valor deve ser maior que 0,00")
      .max(99999.99, "Valor deve ser menor que 99.999,99")
      .required("Valor é obrigatório"),
    parcela: Yup.string()
      .trim()
      .matches(/\b\d{1,2}\/\d{1,2}\b/, "Formato deve ser, por exemplo: 1/3")
      .nullable(),
  });

  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    touched,
    values,
    errors,
  } = useFormik({
    initialValues: movimentoSelecionado || receitaDefault,
    validationSchema,
    onSubmit: async (values) => {
      values.tipo = "RECEITA";
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
        label="Nome"
        control={Input}
        type="text"
        placeholder="Conta de luz"
        id="nome"
        name="nome"
        value={values.nome}
        onChange={handleChange}
        error={
          touched.nome && errors.nome
            ? { content: errors.nome, pointing: "above" }
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
            ? { content: errors.parcela, pointing: "above" }
            : null
        }
      />
      <Form.Field
        label="Valor"
        name="valor"
        control="input"
        type="number"
        max={99999.99}
        min={0.01}
        step={0.01}
        value={values.valor}
        onChange={handleChange}
        error={
          touched.valor && errors.valor
            ? { content: errors.valor, pointing: "above" }
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
                    header="Excluir receita"
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
