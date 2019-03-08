import {addMinutesToMs, minutesToMs} from "./time-utils";
import {MODES} from "../containers/device/device-modes";

const MODE_KEY = 'mode';
const CURRENT_KEY = 'current';
const TOTAL_KEY = 'total';
const START_TIME_KEY = 'start-time';
const LAST_SUBTRACTION_KEY = 'last-subtraction';

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