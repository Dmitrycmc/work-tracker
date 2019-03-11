import React, { Component } from 'react';
import './app.css';
import Device from '../device/device';
import Sign from '../../components/sign/sign';
import { increaseTotal, setTotal } from '../../utils/storage-utils';
import ThemeContainer from '../theme-container/theme-container';

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
            <div className="app">
                <ThemeContainer>
                    <Device />
                    <Sign />
                </ThemeContainer>
            </div>
        );
    }
}

export default App;
