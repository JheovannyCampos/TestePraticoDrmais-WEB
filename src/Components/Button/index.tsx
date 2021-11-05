//Este componente é um botão, com as mesmas propriedades de um botão nativo.
//Está sendo usado desta forma, para ser melhor estilizado.

import {
    Container,
    Title,
} from './styles';

interface ButtonProps {
    onClick: () => void;
    title: string;
}

export function Button({ onClick, title, ...rest }: ButtonProps){
    return (
        <Container
            onClick={onClick}
            {...rest}
        >
            <Title>
                {title}
            </Title>
        </Container>
    );
}