import React, { Component, Fragment } from 'react';
import { fromMs, MINUTE, timeToString } from '../../utils/time-utils';
import { copyTextToClipboard } from '../../utils/clipboard-utils';
import TwoDigits from './two-digits';
import { Delimiter, Minus } from './symbol';
import styled, { keyframes } from 'styled-components/macro';

const flash = keyframes`
    0% {
            color: var(--active-color);
    }
        50% {
            color: var(--inactive-color);
    }
        100% {
            color: var(--active-color);
    }
`;

const TimeWrapper = styled.div`
    ${props => (props.fontSize ? `font-size: ${props.fontSize}px` : '')};
    height: 1em;

    display: flex;

    cursor: pointer;
    &:hover {
        animation: ${flash} 0.5s infinite ease-in-out;
    }
`;

class Time extends Component {
    onClick = () => {
        const negative = this.isNegative();
        const module = this.getModule();
        const { hours, minutes } = fromMs(module);
        const text = timeToString(negative, hours, minutes);
        copyTextToClipboard(text);
    };

    isNegative = () => this.props.value < 0;

    getModule = () => {
        const { value } = this.props;

        if (this.isNegative()) {
            return this.props.showSeconds ? -value : MINUTE - value;
        } else {
            return value;
        }
    };

    render() {
        const { fontSize, delimiter, showSeconds, onlyPositive } = this.props;

        const negative = this.isNegative();
        const module = this.getModule();

        const { hours, minutes, seconds } = fromMs(module);

        return (
            <TimeWrapper fontSize={fontSize} onClick={this.onClick}>
                {!onlyPositive && <Minus show={negative} />}
                <TwoDigits value={hours} />
                <Delimiter show={delimiter} />
                <TwoDigits value={minutes} />
                {showSeconds && (
                    <Fragment>
                        <Delimiter show={delimiter} />
                        <TwoDigits value={seconds} />
                    </Fragment>
                )}
            </TimeWrapper>
        );
    }
}

export default Time;
