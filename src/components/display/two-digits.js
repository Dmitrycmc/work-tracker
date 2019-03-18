import { format } from '../../utils/time-utils';
import React, { Fragment } from 'react';
import styled from 'styled-components/macro';

const Digit = styled.div`
    position: relative;
    z-index: 1;

    &::before {
        content: '8';
        color: var(--inactive-color);
        position: absolute;
        z-index: -1;
    }
`;

const TwoDigits = ({ value }) => {
    const str = format(value);
    return (
        <Fragment>
            <Digit>{str[0]}</Digit>
            <Digit>{str[1]}</Digit>
        </Fragment>
    );
};

export default TwoDigits;
