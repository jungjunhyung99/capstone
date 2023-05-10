import { Link } from 'react-router-dom';
import styled from "styled-components";

export const GlobalContainer = styled.div`
    display: flex;
    width: 100%;
    background-color: black;
    justify-content: center;
`;

export const LaxicalContainer = styled.div`
    width: 80vw;
    display: grid;
    background-color: white;
    grid-template-rows: 10vh, 95vh;
    overflow: scroll;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

export const GlobalKioskDiv = styled.div`
    width: 50vw;
`;

export const GameContainer = styled.div`
    width: 40vw;
    height: 100%;
    display: grid;
    background-color: white;
`;