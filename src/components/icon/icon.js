import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './icon.css';

const Icon = ({ type }) => (
    <div className="icon">
        <FontAwesomeIcon icon={type} />
    </div>
);

export default Icon;
