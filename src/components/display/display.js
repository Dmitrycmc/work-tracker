import React from 'react';
import Icon from '../icon/icon';
import { MODES } from '../device/device-modes';
import { Time } from './time';
import './display.css';

export const Display = ({ current, total, showDelimiter, mode }) => {
    const negative = total < 0;

    return (
        <div className="display-wrapper">
            <span className="indicators-total-wrapper">
                <span className="indicators-wrapper">
                    <Icon type="play" inactive={mode != MODES.play} />
                    <Icon type="pause" inactive={mode != MODES.pause} />
                    <Icon type="stop" inactive={mode != MODES.stop} />
                </span>
                <span className={!negative ? "inactive" : ""}>-</span>
                <Time delimiter hideSeconds className="display-total" value={negative ? -total : total} />
            </span>
            <Time delimiter={showDelimiter} className="display-current" value={current} />
        </div>
    );
}
