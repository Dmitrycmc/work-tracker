import React, { Component, Fragment } from 'react';
import {format, fromMs, MINUTE} from '../../utils/time-utils';
import { copyTextToClipboard } from "../../utils/clipboard-utils";
import "./display.css";
import TwoDigits from "./two-digits";
import {Delimiter, Minus} from "./symbol";

const cursorPointer = {cursor: 'pointer'};

class Time extends Component {

    onClick = () => {
        const { value } = this.props;
        const { hours, minutes } = fromMs(value);
        const text = `${hours}h${minutes}m`;
        copyTextToClipboard(text);
    }

    render() {
        const { className, delimiter, showSeconds, onlyPositive } = this.props;
        let { value } = this.props;
        const negative = value < 0;

        if (negative) {
            value = MINUTE - value;
        }

        const { hours, minutes, seconds } = fromMs(value);

        return (
            <span style={cursorPointer} className={`time ${className || ''}`} onClick={this.onClick}>
                { !onlyPositive && <Minus show={negative}/>}
                <TwoDigits value={hours} />
                <Delimiter show={delimiter}/>
                <TwoDigits value={minutes} />
                {showSeconds && (
                    <Fragment>
                        <Delimiter show={delimiter}/>
                        <TwoDigits value={seconds} />
                    </Fragment>
                )}
            </span>
        );
    }
};

export default Time;