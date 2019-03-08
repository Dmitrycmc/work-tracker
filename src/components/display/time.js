import React, { Component, Fragment } from 'react';
import {fromMs, MINUTE, timeToString} from '../../utils/time-utils';
import { copyTextToClipboard } from "../../utils/clipboard-utils";
import "./display.css";
import TwoDigits from "./two-digits";
import {Delimiter, Minus} from "./symbol";

const cursorPointer = {cursor: 'pointer'};

class Time extends Component {

    onClick = () => {
        const negative = this.isNegative();
        const module = this.getModule();
        const { hours, minutes } = fromMs(module);
        const text = timeToString(negative, hours, minutes);
        copyTextToClipboard(text);
    }

    isNegative = () => this.props.value < 0;

    getModule = () => {
        const { value } = this.props;
        return this.isNegative() ? MINUTE - value : value;
    }

    render() {
        const { className, delimiter, showSeconds, onlyPositive } = this.props;

        const negative = this.isNegative();
        const module = this.getModule();

        const { hours, minutes, seconds } = fromMs(module);

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