import React, { Component } from 'react';
import styled from 'styled-components/macro';
import { buttonGradientMixin } from '../gradient/gradient';

const PadTemplate = styled.div`
    padding: 10px;
    font-size: 23px;
    color: #bbb;
    text-align: center;
    cursor: pointer;
    margin-top: 15px;
    border-radius: var(--border-radius);
    border: 1px #333 solid;
    display: flex;
    flex-direction: column;

    ${buttonGradientMixin}
`;

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

        if (e.keyCode !== keyCode || pressed) return;
        this.setState({ pressed: true });
    };

    handleKeyUp = e => {
        const { keyCode, onClick } = this.props;
        if (e.keyCode !== keyCode) return;
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
        const { onClick, children, gradColor } = this.props;
        const { pressed } = this.state;
        return (
            <PadTemplate gradColor={gradColor} onClick={onClick} pressed={pressed}>
                {children}
            </PadTemplate>
        );
    }
}

const Pad = ({ keyCode, ...rest }) =>
    keyCode ? <PadWithKey keyCode={keyCode} {...rest} /> : <PadTemplate {...rest} />;

export default Pad;
