import React from 'react';
import Icon from '../icon/icon';
import { MODES } from '../device/device-modes';
import { Time } from '../time/time';
import './display.css';

export const Display = ({ current, total, showDelimiter, mode }) => (
    <div className="display-wrapper">
        <span className="indicators-total-wrapper">
            <span className="indicators-wrapper">
                <Icon type="play" inactive={mode != MODES.play} />
                <Icon type="pause" inactive={mode != MODES.pause} />
                <Icon type="stop" inactive={mode != MODES.stop} />
            </span>
            <Time delimiter hideSeconds className="display-total" value={total} />
        </span>
        <Time delimiter={showDelimiter} className="display-current" value={current} />
    </div>
);
