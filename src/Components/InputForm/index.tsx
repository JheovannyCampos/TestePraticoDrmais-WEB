import React from 'react';
import { Control, Controller, ControllerProps } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { Input } from '../Input';
import { Container, Error } from "./styles";

interface Props extends Input{
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
                    onChangeText={onChange}
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

