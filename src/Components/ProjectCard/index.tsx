//Este componente é uma div que representa um card, que exibe os valores em telas,
//como o Código, Título e Descrição do projeto

import { ProjectsDTO } from '../../dtos/ProjectsDTO';

import {
  Container,
  Code,
  Title,
  Description,
  Details,
} from './styles';

interface Props{
    data: ProjectsDTO;
    onClick: () => void
}

export function ProjectCard({data, onClick, ...rest}: Props){
  return (
    <Container 
      onClick={onClick}
      {...rest}
    >
        <Details>
            <Title>Código:<Code>{data.idprojeto}</Code></Title>
          
            <Title>Título:<Title>{data.ds_titulo}</Title></Title>

            <Title>Descrição:<Description>{data.ds_descricao}</Description></Title>
            
        </Details>
    </Container>
  );
}