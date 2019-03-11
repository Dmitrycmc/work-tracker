import React, { Component } from 'react';
import Icon from '../../components/icon/icon';
import Pad from '../../components/pad/pad';
import * as storage from '../../utils/storage-utils';
import { MODES } from './device-modes';
import Display from '../../components/display/display';
import { getFullWeeksSince, getLastMonday, HOUR, SECOND } from '../../utils/time-utils';
import './device.css';

const SPACE_CODE = 32;
const HOURS_PER_WEEK = 30;

class Device extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDelimiter: true,
            intervalId: null
        };
    }

    componentDidMount() {
        const mode = storage.readMode();
        let diffTime = 0;
        let intervalId = null;
        if (mode === MODES.play) {
            const startTime = storage.readStartTime();
            const nowTime = Date.now();
            diffTime = nowTime - startTime;
            intervalId = setInterval(this.tick, SECOND / 2);
        }

        const lastSubtraction = storage.readLastSubtraction();
        const lastMonday = getLastMonday();

        if (lastSubtraction) {
            const weeks = getFullWeeksSince(lastSubtraction);
            if (weeks) {
                storage.writeTotal(storage.readTotal() - weeks * HOURS_PER_WEEK * HOUR);
            }
        }
        storage.writeLastSubtraction(lastMonday);

        this.setState({
            mode: storage.readMode(),
            current: storage.readCurrent() + diffTime,
            total: storage.readTotal() + diffTime,
            intervalId
        });
    }

    tick = () => {
        let diffTime = 0;
        const startTime = storage.readStartTime();
        const nowTime = Date.now();
        diffTime = nowTime - startTime;

        this.setState(prevState => {
            const { showDelimiter } = prevState;
            return {
                showDelimiter: !showDelimiter,
                current: storage.readCurrent() + diffTime,
                total: storage.readTotal() + diffTime
            };
        });
    };

    onStartPause = () => {
        this.setState(prevState => {
            const { mode, intervalId, current, total } = prevState;
            const isRun = mode === MODES.play;
            if (isRun) {
                clearInterval(intervalId);
                storage.writeMode(MODES.pause);
                storage.writeCurrent(current);
                storage.writeTotal(total);
                return {
                    mode: MODES.pause,
                    intervalId: null,
                    showDelimiter: true
                };
            } else {
                const intervalId = setInterval(this.tick, 500);
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
        const { intervalId, total } = this.state;
        clearInterval(intervalId);
        storage.writeTotal(total);
        storage.writeCurrent(0);
        storage.writeMode(MODES.stop);
        this.setState({
            current: 0,
            mode: MODES.stop,
            intervalId: null
        });
    };

    render() {
        const { showDelimiter, current, total, mode } = this.state;
        return (
            <div className="device">
                <Display mode={mode} showDelimiter={showDelimiter} current={current} total={total} />
                <Pad className="pad-start-pause" onClick={this.onStartPause} keyCode={SPACE_CODE}>
                    <span className="label">
                        <Icon type="play" />
                        START
                    </span>
                    <span className="label">
                        <Icon type="pause" />
                        PAUSE
                    </span>
                </Pad>
                <Pad className="pad-reset" onClick={this.onReset}>
                    <span className="label">
                        <Icon type="stop" />
                        RESET
                    </span>
                </Pad>
            </div>
        );
    }
}

export default Device;
