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

const TimeWrapper = styled.span`
    cursor: pointer;
    position: relative;
    z-index: 1;
    ${props => (props.fontSize ? `font-size: ${props.fontSize}px` : '')};

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
        return this.isNegative() ? MINUTE - value : value;
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
