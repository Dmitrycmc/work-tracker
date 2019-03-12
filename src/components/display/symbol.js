import React from 'react';
import styled from 'styled-components/macro';

export const Symbol = styled.span`
    ${props => !props.show && 'color: var(--inactive-color)'};
`;

export const Delimiter = ({ show }) => <Symbol show={show}>:</Symbol>;

export const Minus = ({ show }) => <Symbol show={show}>-</Symbol>;
