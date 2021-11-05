import React, { useEffect, useState } from "react";
import { Button } from "../../Components/Button";
import { ProjectCard } from "../../Components/ProjectCard";
import { ProjectsDTO } from "../../dtos/ProjectsDTO";
import { api } from "../../services/api"
import { 
    Container,
    Header,
    Title,
    ProjectList,
 } from "./styles";

export function Dashboard(){
    const [projects, setProjects] = useState<ProjectsDTO[]>([]);
    
    useEffect(() => {
        async function fetchProjects(){
            try {
                const response = await api.get('/projects')
                setProjects(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchProjects();
    },[projects])

    return (
        <Container>
            <Header>
                <Title>Projetos</Title>
                <Button title="+ Adicionar" onClick={() => {}}/>
            </Header>
            <ProjectList>
                <ul>
                    {projects.map((project) => <li><ProjectCard data={project} onClick={() => {}}/></li>)}
                </ul>
            </ProjectList>
        </Container>
    )
}