import React, { useEffect, useState } from "react";
import { Button } from "../../Components/Button";
import { ProjectCard } from "../../Components/ProjectCard";
import { ProjectsDTO } from "../../dtos/ProjectsDTO";

import { useHistory, useLocation } from "react-router-dom";

import { api } from "../../services/api"
import { 
    Container,
    Header,
    Title,
    ProjectList,
 } from "./styles";

export function Dashboard(){
    const [projects, setProjects] = useState<ProjectsDTO[]>([]);

    const location = useLocation();

    
    const history = useHistory();

    function handleNewProject(){
        history.push("/new-project");
    }

    function handleChangeProject(project: ProjectsDTO){
        history.push({
            pathname: `/change-project`,
            state: project 
        });
    }


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
                <Button title="+ Adicionar" onClick={handleNewProject}/>
            </Header>
            <ProjectList>
                <ul>
                    {projects.map((project) => <li><ProjectCard data={project} onClick={() => handleChangeProject(project)}/></li>)}
                </ul>
            </ProjectList>
        </Container>
    )
}