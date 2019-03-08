import React, { Component } from 'react';
import { format, fromMs } from '../../utils/time-utils';
import { copyTextToClipboard } from "../../utils/clipboard-utils";

const cursorPointer = {cursor: 'pointer'};

class Time extends Component {

    onClick = () => {
        const { value } = this.props;
        const { hours, minutes } = fromMs(value);
        const text = `${hours}h${minutes}m`;
        // todo show modal or animation
        copyTextToClipboard(text);
    }

    render() {
        const { value, className, delimiter, hideSeconds } = this.props;
        const { hours, minutes, seconds } = fromMs(value);

        return (
            <span style={cursorPointer} className={`time ${className || ''}`} onClick={this.onClick}>
                {format(hours)}
                {delimiter ? ':' : ' '}
                {format(minutes)}
                {!hideSeconds && (
                    <span>
                        {delimiter ? ':' : ' '}
                        {format(seconds)}
                    </span>
                )}
            </span>
        );
    }
};

export default Time;