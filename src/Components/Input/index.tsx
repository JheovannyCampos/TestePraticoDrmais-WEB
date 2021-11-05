import React, { InputHTMLAttributes } from "react";

import { Container } from "./styles";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input({...rest}: Props ){
    return (
        <Container {...rest} />
    )
}