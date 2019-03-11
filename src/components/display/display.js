import React from 'react';
import Icon from '../icon/icon';
import { MODES } from '../../containers/device/device-modes';
import Time from './time';
import './display.css';
import { Symbol } from './symbol';

const Display = ({ current, total, showDelimiter, mode }) => {
    return (
        <div className="display-wrapper">
            <span className="indicators-total-wrapper">
                <span className="indicators-wrapper">
                    <Symbol show={mode === MODES.play}>
                        <Icon type="play" />
                    </Symbol>
                    <Symbol show={mode === MODES.pause}>
                        <Icon type="pause" />
                    </Symbol>
                    <Symbol show={mode === MODES.stop}>
                        <Icon type="stop" />
                    </Symbol>
                </span>
                <Time delimiter className="display-total" value={total} />
            </span>
            <Time delimiter={showDelimiter} onlyPositive showSeconds className="display-current" value={current} />
        </div>
    );
};

export default Display;
