import React from "react";
import { 
    Container,
    Header,
    Title,
 } from "./styles";

export function Dashboard(){
    return (
        <Container>
            <Header>
                <Title>Projetos</Title>
                <button>+ Adicionar</button>
            </Header>
        </Container>
    )
}