import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../Components/Button";
import { InputForm } from "../../Components/InputForm";
import { useHistory } from "react-router-dom";

import { api } from "../../services/api";

import { 
    Container,
    Header,
    Title,
    InputArea,
 } from "./styles";


 interface FormData {
    idprojeto: string;
    ds_titulo: string;
    ds_descricao: string;
}

const schema = Yup.object().shape({
    idprojeto: Yup
        .number()
        .required("O código é obrigatório")
        .positive("O código deve ser positivo")
        .typeError("Informe um valor numérico"),
    ds_titulo: Yup
        .string()
        .required("O Título é obrigatório"),
    ds_descricao: Yup
        .string()
        .required("A descrição é obrigatório"),
})

export function NewProject(){
    
    const history = useHistory();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function handleRegister(form: FormData) {
        const newProject = {
            idprojeto: form.idprojeto,
            ds_titulo: form.ds_titulo,
            ds_descricao: form.ds_descricao,
        }

        try {
            await api.post("/projects",  newProject ).then(() => history.push("/"))
            reset();
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <Container>
            <Header>
                <Title>Adicionar um novo projeto</Title>
                <Button title="Salvar" onClick={handleSubmit(handleRegister)}/>
            </Header>
            <InputArea>
                <h3>Código do projeto</h3>
                <InputForm
                name = "idprojeto"
                control = {control}
                placeholder="Digite o Código do Projeto"
                error={errors.idprojeto && errors.idprojeto.message}
            />

                <h3>Título do projeto</h3>
                <InputForm 
                name = "ds_titulo"
                control = {control}
                placeholder="Digite o Nome do Projeto"
                error={errors.ds_titulo && errors.ds_titulo.message}
            />

                <h3>Descrição do projeto</h3>
                <InputForm 
                name = "ds_descricao"
                control = {control}
                placeholder="Faça uma breve descrição do Projeto"
                error={errors.ds_descricao && errors.ds_descricao.message}
            />

            </InputArea>
        </Container>
    )
}