//Nesta tela é onde pode ser alerado ou deletado o projeto
//É apresentado ao usuário uma tela com um formulário
//trazendo os dados atuais para serem alterados,
//Em seu "Header" exitem dois botões, "Salvar" para guardar
//os dados alterados, e "Deletar" para apagar o projeto; 

import { useEffect, useState } from "react";
import { Button } from "../../Components/Button";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from 'yup';
import { api } from "../../services/api"
import { InputForm } from "../../Components/InputForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProjectsDTO } from "../../dtos/ProjectsDTO";

import { 
    Container,
    Header,
    Title,
    ButtonArea,
    InputArea,
 } from "./styles";


//Esta interface abaixo, define a tipagem dos dados que serão trazidos pelo formulário
interface FormData {
    idprojeto: string;
    ds_titulo: string;
    ds_descricao: string;
}

//Este schema abaixo é onde é feito o tratamento dos dados do input
//o input "idprojeto", deve ser um número positivo
//O input "ds_titulo", deve ser uma string e obrigatório
//O input "ds_descricao", deve ser uma string e obrigatório
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

export function ChangeProject(){
    const [projects, setProjects] = useState<ProjectsDTO[]>([]);
    
    const history = useHistory();

    const location = useLocation<any>();

    const project = {
        id: location.state?.id,
        idprojeto: location.state?.idprojeto,
        ds_titulo: location.state?.ds_titulo,
        ds_descricao: location.state?.ds_descricao,
    }

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: project,
    });

    //Esta função serve para deletar o objeto, que tenha o id selecionado pelo objeto
    //o usuário precisa confirmar para deletar o objeto
    async function handleDelete(){
        // eslint-disable-next-line no-restricted-globals
        const resp = confirm("Toque em ok para confirmar")
        resp ?  await api.delete(`/projects/${project.id}`).then(() => history.push("/")) : history.push("/change-project")
    }

    //Esta função abaixo serve para fazer um get na API, pelo id selecionado pelo objeto
    useEffect(() => {
        async function fetchProjects(){
            try {
                const response = await api.get(`/projects?idprojeto=${project.idprojeto}`);
                setProjects(response.data)
            } catch (error) {
                 console.log(error)
            }
        }
        fetchProjects();
    },[])


    //Esta função abaixo serve para fazer um put na API, ou seja, alterar o projeto pelo id selecionado pelo usuário
    async function handleRegister(form: FormData) {
        try {
            await api.put(`/projects/${project.id}`,{
                idprojeto: form.idprojeto,
                ds_titulo: form.ds_titulo,
                ds_descricao: form.ds_descricao,
            }).then(() => history.push("/"))           
            reset();
        } catch (error: any) {
            console.log(error.message);
        }
    }

    //Este return abaixo é onde rola todo o HTML, com os títulos, botões e inputs.
    return (
        <Container>
            <Header>
                <Title>Alterar Projeto</Title>
                <ButtonArea>
                    <Button title="Salvar" onClick={handleSubmit(handleRegister)}/>
                    <Button title="Deletar" onClick={handleDelete}/>
                </ButtonArea>
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