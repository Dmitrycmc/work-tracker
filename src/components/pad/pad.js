import React, { Component } from 'react';
import Sound from 'react-sound';
import soundfile from '../../assets/sounds/click1.mp3';
import './pad.css';

const PadTemplate = ({ onClick, children, className }) => {
    return (
        <div className={`pad ${className || ''}`} onClick={onClick}>
            {children}
        </div>
    );
};

class PadWithKey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            status: Sound.status.STOPPED
        };
    }

    handleMouseDown = e => {
        console.log(e);
        this.setState({ pressed: true, status: Sound.status.PLAYING });
    }

    handleMouseUp = e => {
        if (!this.state.pressed) return;
        this.setState({ pressed: false });
        this.props.onClick();
    }

    handleKeyDown = e => {
        const { keyCode } = this.props;
        const { pressed } = this.state;

        if (e.keyCode !== keyCode || pressed) return;
        this.setState({ pressed: true, status: Sound.status.PLAYING });
    };

    handleKeyUp = e => {
        const { keyCode, onClick } = this.props;
        if (e.keyCode !== keyCode) return;
        this.setState({ pressed: false });
        onClick && onClick();
    };

    shouldComponentUpdate(nextProps, nextState){
        return this.state.pressed != nextState.pressed;
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }

    render() {
        const { children, className } = this.props;
        const { pressed } = this.state;
        console.log(this.state.pressed);
        return (
            <div onMouseDown={this.handleMouseDown}>
                <Sound url={soundfile}
                       playStatus={this.state.status} loop={false}
                />
                <PadTemplate children={children} className={`${className} ${pressed ? 'pressed' : ''}`} />
            </div>
        );
    }
}

const Pad = ({ keyCode, ...rest }) =>
    keyCode ? <PadWithKey keyCode={keyCode} {...rest} /> : <PadTemplate {...rest} />;

export default Pad;
