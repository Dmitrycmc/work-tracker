import React from 'react';
import './radio-buttons.css';


const Button = ({value, active, onClick}) => (
    <div onClick={() => onClick(value)} className={`outer-radio-button ${active && 'active'}`}>
        <div style={{backgroundColor: value}} className="inner-radio-button">

        </div>
    </div>
);

const RadioButtons = ({options, value, onChange}) => (
    <div className="radio-button-wrapper">
        {options.map(option => <Button onClick={onChange} active={option === value} value={option} key={option}/>)}
    </div>
);

export default  RadioButtons;