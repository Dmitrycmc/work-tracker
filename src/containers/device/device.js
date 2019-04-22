import React, { Component } from 'react';
import Icon from '../../components/icon/icon';
import Pad from '../../components/pad/pad';
import * as storage from '../../utils/storage-utils';
import { MODES } from './device-modes';
import Display from '../../components/display/display';
import { getFullWeeksSince, getLastMonday, HOUR, SECOND } from '../../utils/time-utils';
import styled from 'styled-components/macro';
import { backgroundGradient } from '../../components/gradient/gradient';
import { calcDiffTime, calcCurrent, calcTotal } from '../../utils/storage-utils';

const Wrapper = styled.div`
    border-radius: var(--border-radius);
    border: 1px #333 solid;
    user-select: none;
    padding: 15px;
    ${backgroundGradient}
`;

const Label = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
`;

const SPACE_CODE = 32;
const HOURS_PER_WEEK = 0; /// Changed for May's holidays

class Device extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDelimiter: true,
            intervalId: null
        };
    }

    //todo: refactor
    componentDidMount() {
        const mode = storage.readMode();
        const total = storage.readTotal();
        const current = storage.readCurrent();

        let diffTime = 0;
        let intervalId = null;
        if (mode === MODES.play) {
            diffTime = calcDiffTime();
            intervalId = setInterval(this.tick, SECOND / 2);
        }

        const lastSubtraction = storage.readLastSubtraction();
        const lastMonday = getLastMonday();

        if (lastSubtraction) {
            const weeks = getFullWeeksSince(lastSubtraction);
            if (weeks) {
                storage.writeTotal(total - weeks * HOURS_PER_WEEK * HOUR);
            }
        }
        storage.writeLastSubtraction(lastMonday);

        this.setState({
            mode,
            current: current,
            total: total + diffTime,
            intervalId
        });
    }

    tick = () => {
        const current = calcCurrent();
        const total = calcTotal();

        this.setState(({ showDelimiter }) => {
            return {
                showDelimiter: !showDelimiter,
                current,
                total
            };
        });
    };

    onStartPause = () => {
        this.setState(prevState => {
            const { mode, intervalId } = prevState;

            if (mode === MODES.play) {
                const current = calcCurrent();
                const total = calcTotal();

                clearInterval(intervalId);
                storage.writeMode(MODES.pause);
                storage.writeCurrent(current);
                storage.writeTotal(total);
                return {
                    mode: MODES.pause,
                    intervalId: null,
                    showDelimiter: true,
                    current,
                    total
                };
            } else {
                const intervalId = setInterval(this.tick, SECOND / 2);
                storage.writeStartTime(Date.now());
                storage.writeMode(MODES.play);
                return {
                    mode: MODES.play,
                    intervalId
                };
            }
        });
    };

    onReset = () => {
        const { intervalId } = this.state;
        const total = calcTotal();

        clearInterval(intervalId);
        storage.writeTotal(total);
        storage.writeCurrent(0);
        storage.writeMode(MODES.stop);
        this.setState({
            current: 0,
            mode: MODES.stop,
            intervalId: null,
            showDelimiter: true
        });
    };

    render() {
        const { showDelimiter, current, total, mode } = this.state;
        return (
            <Wrapper gradColor={'#222'}>
                <Display mode={mode} showDelimiter={showDelimiter} current={current} total={total} />
                <Pad gradColor="green" onClick={this.onStartPause} keyCode={SPACE_CODE}>
                    <Label>
                        <Icon type="play" />
                        START
                    </Label>
                    <Label className="label">
                        <Icon type="pause" />
                        PAUSE
                    </Label>
                </Pad>
                <Pad gradColor="red" onClick={this.onReset}>
                    <Label className="label">
                        <Icon type="stop" />
                        RESET
                    </Label>
                </Pad>
            </Wrapper>
        );
    }
}

export default Device;
