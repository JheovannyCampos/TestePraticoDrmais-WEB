import styled from "styled-components";

export const Container = styled.div`
    max-width: auto;
`;
export const Header = styled.div`
    max-width: auto;
    height: 200px;
    display: flex;
    background-color: whitesmoke;

    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 10px;
`;

export const Title = styled.h1`
    font-size: 90px;
    padding-left: 20px;
    color: black;
`;

export const ButtonArea = styled.div`
    width: 100px;
    height: 70px;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
`;

export const InputArea = styled.div`
    width: 150px;
    margin-top: 20px;
`;