import React, { Component } from 'react';
import Device from '../device/device';
import Sign from '../../components/sign/sign';
import { increaseTotal, setTotal } from '../../utils/storage-utils';
import ThemeContainer from '../theme-container/theme-container';
import styled, { createGlobalStyle } from 'styled-components/macro';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    --border-radius: 5px;
`;

const GlobalStyle = createGlobalStyle`
    :root {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body {
        margin: 0;
        padding: 0;
        background-image: url(https://pp.userapi.com/c845523/v845523713/cd5dc/01aQ6hG3Tlo.jpg);
        background-size: 1024px;
        
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    @media (min-width: 1024px), (min-height: 1024px) {
        body {
            background-size: 100vmax;
        }
    }
`;

class App extends Component {
    componentDidMount() {
        Object.defineProperty(window, 'drop', {
            value: value => {
                increaseTotal(value);
            }
        });
        Object.defineProperty(window, 'set', {
            value: value => {
                setTotal(value);
            }
        });
    }

    render() {
        return (
            <Wrapper>
                <GlobalStyle />
                <ThemeContainer>
                    <Device />
                    <Sign />
                </ThemeContainer>
            </Wrapper>
        );
    }
}

export default App;
