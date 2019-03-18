import { createGlobalStyle, css } from 'styled-components/macro';

const themesToVariables = {
    black: css`
        --display-background: #ddd;
        --active-color: black;
        --inactive-color: #bbb;

        --sign-color: black;
        --background-image: url(https://pp.userapi.com/c845523/v845523713/cd5dc/01aQ6hG3Tlo.jpg);
    `,
    red: css`
        --display-background: black;
        --active-color: red;
        --inactive-color: #400;

        --sign-color: white;
        --background-image: url(https://pp.userapi.com/c853420/v853420195/6908/KVFpinmba-Q.jpg);
    `,
    blue: css`
        --display-background: black;
        --active-color: blue;
        --inactive-color: #004;

        --sign-color: white;
        --background-image: url(https://pp.userapi.com/c853420/v853420195/6908/KVFpinmba-Q.jpg);
    `,
    green: css`
        --display-background: black;
        --active-color: green;
        --inactive-color: #030;

        --sign-color: white;
        --background-image: url(https://pp.userapi.com/c853420/v853420195/6908/KVFpinmba-Q.jpg);
    `
};

const GlobalVariables = createGlobalStyle`
    :root {
        ${props => themesToVariables[props.theme]}
    }
`;

export default GlobalVariables;
