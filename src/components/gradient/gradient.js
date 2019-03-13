import { css } from 'styled-components/macro';
import tinycolor from 'tinycolor2';

//todo: fix naming pls
// todo: ref grad

const angle = 135;

const adjustColor = (color, darkenPercentage) => {
    const hsl = tinycolor(color).toHsl();

    return tinycolor({
        ...hsl,
        l: 0.3 - darkenPercentage / 100
    }).toString();
}

export const backgroundGradient = css`
    background: linear-gradient(
        ${angle}deg,
        ${props => adjustColor(props.gradColor, 7)} 0%,
        ${props => adjustColor(props.gradColor, 0)} 50%,
        ${props => adjustColor(props.gradColor, 10)} 51%,
        ${props => adjustColor(props.gradColor, 15)} 65%
    );
`;

const hoverButton = css`
    &:hover {
        background: linear-gradient(
            ${angle}deg,
            ${props => adjustColor(props.gradColor, 8)} 0%,
            ${props => adjustColor(props.gradColor, 2)} 50%,
            ${props => adjustColor(props.gradColor, 18)} 50%,
            ${props => adjustColor(props.gradColor, 20)} 65%
        );
    }
`;

const pressedButtonRules = css`
    background: linear-gradient(
        ${angle}deg,
        ${props => adjustColor(props.gradColor, 20)} 0%,
        ${props => adjustColor(props.gradColor, 12)} 50%,
        ${props => adjustColor(props.gradColor, 18)} 50%,
        ${props => adjustColor(props.gradColor, 37)} 65%
    );
`;

const activeButtonRules = css`
    &:active {
        ${pressedButtonRules}
    }
`;

export const buttonGradientMixin = css`
    ${backgroundGradient}
    ${props => (!props.pressed ? hoverButton : '')}
    ${props => (props.pressed ? pressedButtonRules : activeButtonRules)}
`;
