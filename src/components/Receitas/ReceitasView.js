import React from 'react';
import {Container} from 'semantic-ui-react';
import ModalCadastro from '../ModalCadastro/ModalCadastro';
import Tabela from '../Tabela/Tabela';
import FormReceitas from './components/FormReceitas';

export default function ReceitasView({
                                         open,
                                         setOpen,
                                         editar,
                                         limpar,
                                         setReceitas,
                                         tabelaReceitas,
                                         movimentoSelecionado,
                                     }) {
    const receitas = tabelaReceitas.movimentos;
    const formulario = (
        <FormReceitas
            {...{receitas, setReceitas, setOpen, movimentoSelecionado}}
        />
    );
    const titulo = 'Adicionar receita';
    return (
        <Container>
            <Tabela {...{dados: tabelaReceitas, editar}} />
            <ModalCadastro {...{open, setOpen, titulo, formulario, limpar}} />
        </Container>
    );
}
