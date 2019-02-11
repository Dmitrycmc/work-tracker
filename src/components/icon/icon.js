import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './icon.css';

const Icon = ({type, inactive}) => (
    <span className={`icon ${inactive ? " indicator-inactive" : ""}`}>
        <FontAwesomeIcon icon={type} />
    </span>
);

export default Icon;
