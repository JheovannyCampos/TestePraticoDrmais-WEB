import React from "react";
import { Button } from "../../Components/Button";
import { api } from "../../services/api"
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
                <Button title="+ Adicionar" onClick={() => {}}/>
            </Header>


        </Container>
    )
}