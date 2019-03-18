import React from 'react';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    margin: 8px;
    color: var(--sign-color);
`;

const Link = styled.a`
    color: inherit;
    text-decoration: none;

    &:hover {
        color: #11a;
        text-decoration: underline;
    }
`;

const Sign = () => (
    <Wrapper>
        <div>Designed & coded by</div>
        <Link href="https://codepen.io/Dimancmc/full/vaVJBj" target="_blank" rel="noopener noreferrer">
            Lytov Dmitry
        </Link>
    </Wrapper>
);

export default Sign;
