import React, { Component } from 'react';
import Sound from 'react-sound';
import soundfile from '../../assets/sounds/click1.mp3';
import './pad.css';

class Pad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            status: Sound.status.STOPPED
        };
    }

    handleMouseDown = () => {
        this.setState({
            pressed: true,
            status: Sound.status.PLAYING
        });
    }

    handleMouseUp = () => {
        const { onClick } = this.props;
        const { pressed } = this.state;
        if (pressed) {
            this.setState({ pressed: false });
            onClick && onClick();
        }
    }

    handleKeyDown = e => {
        const { keyCode } = this.props;
        const { pressed } = this.state;

        if (e.keyCode !== keyCode || pressed) return;
        this.setState({
            pressed: true,
            status: Sound.status.PLAYING
        });
    };

    handleKeyUp = e => {
        const { keyCode, onClick } = this.props;
        if (e.keyCode === keyCode) {
            this.setState({pressed: false});
            onClick && onClick();
        }
    };

    shouldComponentUpdate(nextProps, nextState){
        return this.state.pressed != nextState.pressed;
    }

    componentDidMount() {
        if (this.props.keyCode) {
            document.addEventListener('keydown', this.handleKeyDown);
            document.addEventListener('keyup', this.handleKeyUp);
        }
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    componentWillUnmount() {
        if (this.props.keyCode) {
            document.removeEventListener('keydown', this.handleKeyDown);
            document.removeEventListener('keyup', this.handleKeyUp);
        }
        document.removeEventListener('mouseup', this.handleMouseUp);
    }

    render() {
        const { children, className } = this.props;
        const { pressed, status } = this.state;
        console.log(this.state.pressed);
        return (
            <div>
                <Sound
                    url={soundfile}
                    playStatus={status}
                    loop={false}
                    autoLoad
                />
                <div
                    onMouseDown={this.handleMouseDown}
                    className={`pad ${className || ''} ${pressed ? 'pressed' : ''}`}
                >
                    {children}
                </div>
            </div>
        );
    }
}

export default Pad;

// todo: add second sound
// todo: add incapsulated Sound