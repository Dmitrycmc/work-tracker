import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './icon.css';

export default ({type, inactive}) => (
    <span className={`icon ${inactive ? " indicator-inactive" : ""}`}>
        <FontAwesomeIcon icon={type} />
    </span>
)
