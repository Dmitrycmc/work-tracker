import { addMinutesToMs, minutesToMs } from './time-utils';
import { MODES } from '../containers/device/device-modes';
import { defaultTheme } from '../containers/theme-container/themes';

const MODE_KEY = 'mode';
const CURRENT_KEY = 'current';
const TOTAL_KEY = 'total';
const START_TIME_KEY = 'start-time';
const LAST_SUBTRACTION_KEY = 'last-subtraction';
const DISPLAY_THEME_KEY = 'display-theme';

export const readMode = () => +localStorage.getItem(MODE_KEY) || MODES.stop;
export const writeMode = value => localStorage.setItem(MODE_KEY, value);

export const readCurrent = () => +localStorage.getItem(CURRENT_KEY) || 0;
export const writeCurrent = value => localStorage.setItem(CURRENT_KEY, value);

export const readTotal = () => +localStorage.getItem(TOTAL_KEY) || 0;
export const writeTotal = value => localStorage.setItem(TOTAL_KEY, value);

export const readStartTime = () => +localStorage.getItem(START_TIME_KEY) || 0;
export const writeStartTime = value => localStorage.setItem(START_TIME_KEY, value);

export const readLastSubtraction = () => +localStorage.getItem(LAST_SUBTRACTION_KEY) || 0;
export const writeLastSubtraction = value => localStorage.setItem(LAST_SUBTRACTION_KEY, value);

export const readDisplayTheme = () => localStorage.getItem(DISPLAY_THEME_KEY) || defaultTheme;
export const writeDisplayTheme = value => localStorage.setItem(DISPLAY_THEME_KEY, value);

export const increaseTotal = minutes => {
    const total = readTotal();
    writeTotal(addMinutesToMs(total, minutes));
};

// todo: refactoring
export const setTotal = value => {
    const mode = readMode();
    const valueMs = minutesToMs(value);
    let total = valueMs;

    if (mode === MODES.play) {
        const startTime = readStartTime();
        const now = Date.now();
        const diff = now - startTime;
        total -= diff;
    }

    writeTotal(total);
};

export const calcDiffTime = () => {
    const startTime = readStartTime();
    const nowTime = Date.now();
    return nowTime - startTime;
};

export const calcTotal = () => readTotal() + calcDiffTime();
export const calcCurrent = () => readCurrent() + calcDiffTime();
