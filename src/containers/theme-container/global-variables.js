import { createGlobalStyle, css } from 'styled-components/macro';

const themesToVariables = {
    black: css`
        --display-background: #ddd;
        --active-color: black;
        --inactive-color: #bbb;
    `,
    red: css`
        --display-background: black;
        --active-color: red;
        --inactive-color: #400;
    `,
    blue: css`
        --display-background: black;
        --active-color: blue;
        --inactive-color: #004;
    `,
    green: css`
        --display-background: black;
        --active-color: green;
        --inactive-color: #030;
    `
};

const GlobalVariables = createGlobalStyle`
    :root {
        ${props => themesToVariables[props.theme]}
    }
`;

export default GlobalVariables;
