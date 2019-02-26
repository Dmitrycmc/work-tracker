import React, { Component } from 'react';
import './app.css';
import Device from '../../components/device/device';
import Sign from '../../components/sign/sign';

const App = () => (
    <div className="app">
        <Device />
        <Sign />
    </div>
);

export default App;
