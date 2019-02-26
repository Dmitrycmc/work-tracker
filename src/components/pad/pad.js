import React, { Component } from 'react';
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
            pressed: false
        };
    }

    handleKeyDown = e => {
        const { keyCode } = this.props;
        const { pressed } = this.state;

        if (e.keyCode != keyCode || pressed) return;
        this.setState({ pressed: true });
    };

    handleKeyUp = e => {
        const { keyCode, onClick } = this.props;
        if (e.keyCode != keyCode) return;
        this.setState({ pressed: false });
        onClick && onClick();
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    }

    render() {
        const { onClick, children, className } = this.props;
        const { pressed } = this.state;
        return (
            <PadTemplate onClick={onClick} children={children} className={`${className} ${pressed ? 'pressed' : 0}`} />
        );
    }
}

const Pad = ({ keyCode, ...rest }) =>
    keyCode ? <PadWithKey keyCode={keyCode} {...rest} /> : <PadTemplate {...rest} />;

export default Pad;
