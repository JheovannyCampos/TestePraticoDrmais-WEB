//Este componente é um input com as propriedades de um input nativo, entretando com estilizações
//Ele está sendo usado dentro de outro componente para utilização do React-Hook-Form

import { InputHTMLAttributes } from "react";

import { Container } from "./styles";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input({...rest}: Props ){
    return (
        <Container {...rest} />
    )
}