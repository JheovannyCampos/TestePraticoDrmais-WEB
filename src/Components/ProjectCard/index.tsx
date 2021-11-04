import React from 'react';
import { ProjectsDTO } from '../../dtos/ProjectsDTO';

import {
  Container,
  Code,
  Title,
  Description,
  Details,
} from './styles';

interface Props {
    data: ProjectsDTO;
    onClick?: () => any;
}

export function ProjectCard({data, onClick, ...rest}: Props){
  return (
    <Container 
      onClick={onClick}
      {...rest}
    >
        <Details>
            <Code>{data.idprojeto}</Code>
            <Title>{data.ds_titulo}</Title>
            <Description>{data.ds_descricao}</Description>
        </Details>
    </Container>
  );
}