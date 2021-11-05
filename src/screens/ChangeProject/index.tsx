import React, { useEffect, useState } from "react";
import { Button } from "../../Components/Button";
import { ProjectCard } from "../../Components/ProjectCard";
import { ProjectsDTO } from "../../dtos/ProjectsDTO";

import { useHistory, useLocation } from "react-router-dom";
import * as Yup from 'yup';
import { api } from "../../services/api"

import { 
    Container,
    Header,
    Title,
    ButtonArea,
    InputArea,
 } from "./styles";
import { InputForm } from "../../Components/InputForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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

    console.log(location)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: project,
    });

    async function handleDelete(){
        await api.delete(`/projects/${project.id}`).then(() => history.push("/"));
    }

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