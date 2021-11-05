//Este compoenente é um input com as propriedades de um input nativo
//Mas está sendo componentizado para a utilização do react-hook-form
// como por exemplo a propriedades de "Control" e "Controller"

import { InputHTMLAttributes } from 'react';
import { Control, Controller} from 'react-hook-form';
import { Input } from '../Input';

import { 
    Container, 
    Error 
} from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement>{
    control: Control;
    name: string;
    error: string;
}

export function InputForm({
    control, 
    name, 
    error, 
    ...rest
} : Props){
    return(
        <Container>
            <Controller
                control={control}
                render={({ field: { onChange, value }}) => (
                    <Input 
                    onChange={onChange}
                    value={value && value.toString()}
                    {...rest}
                />
                )}
                name={name}
            />
            {error && <Error>{ error }</Error>}
        </Container>
    )
}

