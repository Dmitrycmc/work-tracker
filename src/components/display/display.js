import React from 'react';
import Icon from '../icon/icon';
import { MODES } from '../../containers/device/device-modes';
import Time from './time';
import { Symbol } from './symbol';
import styled from 'styled-components/macro';

const DisplayWrapper = styled.div`
    background: var(--display-background);
    border-radius: var(--border-radius);
    height: 65px;
    padding: 7px 12px;
    color: var(--active-color);
    font-family: Digital;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    cursor: default;
    border: 1px solid #666;
`;

const IndicatorsTotalWrapper = styled.div`
    font-size: 15px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const IndicatorsWrapper = styled.div`
    display: flex;
`;

const Display = ({ current, total, showDelimiter, mode }) => {
    return (
        <DisplayWrapper>
            <IndicatorsTotalWrapper>
                <IndicatorsWrapper>
                    <Symbol show={mode === MODES.play}>
                        <Icon type="play" />
                    </Symbol>
                    <Symbol show={mode === MODES.pause}>
                        <Icon type="pause" />
                    </Symbol>
                    <Symbol show={mode === MODES.stop}>
                        <Icon type="stop" />
                    </Symbol>
                </IndicatorsWrapper>
                <Time delimiter value={total} fontSize="27" />
            </IndicatorsTotalWrapper>
            <Time delimiter={showDelimiter} onlyPositive showSeconds fontSize="40" value={current} />
        </DisplayWrapper>
    );
};

export default Display;
