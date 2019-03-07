import React, { Component } from 'react';
import './app.css';
import Device from '../device/device';
import Sign from '../../components/sign/sign';
import { increaseTotal } from "../../utils/storage-utils";


class App extends Component {

    componentDidMount() {
        Object.defineProperty(window, 'drop', {
            value: value => { increaseTotal(value); },
        });
    }

    render() {
        return (
            <div className="app">
                <Device/>
                <Sign/>
            </div>
        );
    }
};

export default App;
