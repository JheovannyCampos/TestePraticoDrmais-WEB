//Esta tela é a Dashboard, onde são apresentados os projetos que existem na API
//O usuário tem um botão com a opção de adicionar um novo projeto,
//Ou clicar no card para alterar um projeto existente

import { useEffect, useState } from "react";
import { Button } from "../../Components/Button";
import { ProjectCard } from "../../Components/ProjectCard";
import { ProjectsDTO } from "../../dtos/ProjectsDTO";
import { useHistory } from "react-router-dom";
import { api } from "../../services/api";

import { 
    Container,
    Header,
    Title,
    ProjectList,
 } from "./styles";

export function Dashboard(){
    const [projects, setProjects] = useState<ProjectsDTO[]>([]);

    const history = useHistory();

    //Esta função serve para navegar para a pagina de "New Project",
    //para adicionar um novo projeto na API
    function handleNewProject(){
        history.push("/new-project");
    }

    //Esta função serve para navegar para a página de alteração do projetos
    //passando um objeto, que é o projeto, com todos os atributos.
    function handleChangeProject(project: ProjectsDTO){
        history.push({
            pathname: `/change-project`,
            state: project 
        });
    }

    //Esta função está fazendo um get na API, para que os items sejam 
    //listados na Dashboard
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

    //Este return é onde rola todo o HTML, onde contem o Título da página
    //A lista onde estão os projetos e o botão para adicionar um novo projeto
    return (
        <Container>
            <Header>
                <Title>Projetos</Title>
                <Button title="+ Adicionar" onClick={handleNewProject}/>
            </Header>
            <h3>Toque no card para alterar um projeto</h3>
            <ProjectList>
                <ul>
                    {projects.map((project) => <li><ProjectCard data={project} onClick={() => handleChangeProject(project)}/></li>)}
                </ul>
            </ProjectList>
        </Container>
    )
}