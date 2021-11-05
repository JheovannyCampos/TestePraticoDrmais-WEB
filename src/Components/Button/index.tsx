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