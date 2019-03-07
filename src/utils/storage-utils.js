import { addMinutesToMs } from "./time-utils";

const MODE_KEY = 'mode';
const CURRENT_KEY = 'current';
const TOTAL_KEY = 'total';
const START_TIME_KEY = 'start-time';
const LAST_SUBTRACTION_KEY = 'last-subtraction';

export const getMode = () => +localStorage.getItem(MODE_KEY) || 0;
export const setMode = value => localStorage.setItem(MODE_KEY, value);

export const getCurrent = () => +localStorage.getItem(CURRENT_KEY) || 0;
export const setCurrent = value => localStorage.setItem(CURRENT_KEY, value);

export const getTotal = () => +localStorage.getItem(TOTAL_KEY) || 0;
export const setTotal = value => localStorage.setItem(TOTAL_KEY, value);
export const increaseTotal = minutes => {
    const total = getTotal();
    setTotal(addMinutesToMs(total, minutes));
};

export const getStartTime = () => +localStorage.getItem(START_TIME_KEY) || 0;
export const setStartTime = value => localStorage.setItem(START_TIME_KEY, value);

export const getLastSubtraction = () => +localStorage.getItem(LAST_SUBTRACTION_KEY) || 0;
export const setLastSubtraction = value => localStorage.setItem(LAST_SUBTRACTION_KEY, value);
