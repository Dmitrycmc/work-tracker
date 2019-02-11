import React from 'react';
import './pad.css';

const Pad = ({ onClick, children, className }) => (
    <div className={`pad ${className || ''}`} onClick={onClick}>
        {children}
    </div>
);

export default Pad;