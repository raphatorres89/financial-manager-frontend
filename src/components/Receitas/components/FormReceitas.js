import React from 'react';
import {Button, Checkbox, Form, Input} from 'semantic-ui-react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

export default function FormReceitas({
                                         receitas,
                                         setReceitas,
                                         setOpen,
                                         movimentoSelecionado,
                                     }) {
    const receitaDefault = {
        nome: '',
        valor: '0.00',
        parcela: '',
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
        onSubmit: (values) => {
            if (values.id) {
                const receitasComModificacao = receitas.map((receita) => {
                    if (receita.id === values.id) {
                        return values;
                    }
                    return receita;
                });
                setReceitas([...receitasComModificacao]);
            } else {
                setReceitas([...receitas, values]);
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
                            ? {content: errors.nome, pointing: 'above'}
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
                            ? {content: errors.parcela, pointing: 'above'}
                            : null
                    }
                />
            </Form.Field>
            <Form.Field>
                <Input
                    label={{basic: true, content: 'R$'}}
                    labelPosition="left"
                    type="number"
                    id="valor"
                    name="valor"
                    min={0.0}
                    max={9999.99}
                    step={0.01}
                    placeholder="0,00"
                    value={values.valor}
                    onChange={handleChange}
                    error={
                        touched.valor && errors.valor
                            ? {content: errors.valor, pointing: 'above'}
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
                    onChange={(e, {name, checked}) => setFieldValue(name, !!checked)}
                />
            </Form.Field>
            <Button type="submit">Enviar</Button>
        </Form>
    );
}
