import React from 'react';
import Icon from '../icon/icon';
import { MODES } from '../../containers/device/device-modes';
import Time from './time';
import './display.css';

const Display = ({ current, total, showDelimiter, mode }) => {

    return (
        <div className="display-wrapper">
            <span className="indicators-total-wrapper">
                <span className="indicators-wrapper">
                    <Icon type="play" inactive={mode !== MODES.play} />
                    <Icon type="pause" inactive={mode !== MODES.pause} />
                    <Icon type="stop" inactive={mode !== MODES.stop} />
                </span>
                <Time delimiter className="display-total" value={total} />
            </span>
            <Time delimiter={showDelimiter} onlyPositive showSeconds className="display-current" value={current} />
        </div>
    );
}

export default Display;