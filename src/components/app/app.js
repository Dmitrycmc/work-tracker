import React, { Component } from 'react';
import './app.css';
import Device from '../../containers/device/device';
import Sign from '..//sign/sign';

const App = () => (
  <div className="app">
    <Device />
    <Sign />
  </div>
);

export default App;
