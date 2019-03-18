import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
    margin: 0 5px;
    font-size: 0.8em;
`;

const Icon = ({ type }) => (
    <Wrapper>
        <FontAwesomeIcon icon={type} />
    </Wrapper>
);

export default Icon;
