import React from 'react';
import styled from 'styled-components/macro';
import { buttonGradientMixin } from '../gradient/gradient';

const Wrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;

    display: flex;
    flex-direction: row;
`;

const Outer = styled.div`
    padding: 6px;
    margin: 2px;
    height: fit-content;
    border: 2px solid #555;
    border-radius: var(--border-radius);

    cursor: pointer;

    ${props => (props.active ? 'border: 2px solid #006dda' : '')};
    ${buttonGradientMixin}
`;

const Inner = styled.div`
    width: 30px;
    height: 30px;
    border-radius: var(--border-radius);
    background-color: ${props => props.color};
    opacity: 0.7;
`;

const Button = ({ value, active, onClick }) => (
    <Outer gradColor="#444" onClick={() => onClick(value)} active={active}>
        <Inner color={value} />
    </Outer>
);

const RadioButtons = ({ options, value, onChange }) => (
    <Wrapper>
        {options.map(option => (
            <Button onClick={onChange} active={option === value} value={option} key={option} />
        ))}
    </Wrapper>
);

export default RadioButtons;
