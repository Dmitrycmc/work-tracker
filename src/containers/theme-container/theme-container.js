import React, { Component } from 'react';
import { readDisplayTheme, writeDisplayTheme } from '../../utils/storage-utils';
import { themes } from './themes';
import RadioButtons from '../../components/radio-buttons/radio-buttons';
import './theme-container.css';

class ThemeContainer extends Component {
    state = {
        displayTheme: readDisplayTheme()
    };

    displayThemeChanged = theme => {
        this.setState({ displayTheme: theme }, () => {
            writeDisplayTheme(theme);
        });
    };

    render() {
        const { displayTheme } = this.state;
        const { children } = this.props;
        return (
            <div className={displayTheme + '-theme'}>
                <RadioButtons options={themes} onChange={this.displayThemeChanged} value={displayTheme} />
                {children}
            </div>
        );
    }
}

export default ThemeContainer;
