import React, { Component } from 'react';
import Icon from '../icon/icon';
import Pad from '../pad/pad';
import { storage } from '../../utils/storage-utils';
import { format, fromMs } from '../../utils/time-utils';
import { MODES } from './device-modes';
import './device.css';

const SPACE = 32;

const Time = ({value, className, delimiter, hideSeconds}) => {
  const { hours, minutes, seconds } = fromMs(value);

  return (
    <span className={className}>
      {format(hours)}
      {delimiter ? ':' : ' '}
      {format(minutes)}
      {!hideSeconds && <span>{delimiter ? ':' : ' '}
      {format(seconds)}</span>}
    </span>
  );
}

const Display = ({current, total, showDelimiter, mode}) => (
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

class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelimiter: true,
      intervalId: null    
    };
  }
  /*
  handleKeyDown = e => {
    if (e.keyCode != SPACE || this.state.pressed) return;
    this.props.onClick && this.props.onClick();
    this.setState({pressed: true});
  };
  
  handleKeyUp = e => {
    if (e.keyCode != SPACE) return;
    this.setState({pressed: false});
  };
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  };
  */
  componentDidMount() {
    const mode = storage.getMode();
    let diffTime = 0;
    let intervalId = null;
    if (mode == MODES.play) {
      const startTime = storage.getStartTime();
      const nowTime = Date.now();
      diffTime = nowTime - startTime;
      intervalId = setInterval(this.tick, 500);
    }
    
    this.setState({
      mode: storage.getMode(),
      time: storage.getCurrent() + diffTime,
      total: storage.getTotal() + diffTime,
      intervalId
    });
  }
  
  tick = () => {
    let diffTime = 0;
    const startTime = storage.getStartTime();
    const nowTime = Date.now();
    diffTime = nowTime - startTime;
    
    this.setState(prevState => {
      const { showDelimiter, time, total } = prevState;
      return {
        showDelimiter: !showDelimiter,
        time: storage.getCurrent() + diffTime,
        total: storage.getTotal() + diffTime
      };
    });
  }

  onStartPause = () => {
    this.setState(prevState => {
      const { mode, intervalId, time, total } = prevState; 
      const isRun = mode == MODES.play; 
      if (isRun) {
        clearInterval(intervalId);
        storage.setMode(MODES.pause);
        storage.setCurrent(time);
        storage.setTotal(total);
        return {
          mode: MODES.pause,
          intervalId: null,
          showDelimiter: true
        };
      } else {
        const intervalId = setInterval(this.tick, 500);
        storage.setStartTime(Date.now());
        storage.setMode(MODES.play);
        return { 
          mode: MODES.play,
          intervalId
        };  
      }
    });
  }
  
  onReset = () => {
    const { intervalId, total, time } = this.state;
    clearInterval(intervalId);
    storage.setTotal(total);
    storage.setCurrent(0);
    storage.setMode(MODES.stop);
    this.setState({
      time: 0,
      mode: MODES.stop,
      intervalId: null
    });
  }
  
  render() {
    const { showDelimiter, time, total, mode } = this.state;
    return (
      <div className="device">
        <Display 
          mode={mode}
          showDelimiter={showDelimiter}
          current={time} 
          total={total} 
          />
        <Pad className='pad-start-pause' onClick={this.onStartPause}>
          <span><Icon type="play" />START</span>
          <span><Icon type="pause" />PAUSE</span>
        </Pad>
        <Pad className='pad-reset' onClick={this.onReset}>
          <span><Icon type="stop" />RESET</span>
        </Pad>
      </div>
    );
  }
}

export default Device;