const MODE_KEY = 'mode';
const CURRENT_KEY = 'current';
const TOTAL_KEY = 'total';
const START_TIME_KEY = 'start-time';
const LAST_SUBTRACTION_KEY = 'last-subtraction';

export const storage = {
    getMode: () => +localStorage.getItem(MODE_KEY) || 0,
    setMode: value => localStorage.setItem(MODE_KEY, value),

    getCurrent: () => +localStorage.getItem(CURRENT_KEY) || 0,
    setCurrent: value => localStorage.setItem(CURRENT_KEY, value),

    getTotal: () => +localStorage.getItem(TOTAL_KEY) || 0,
    setTotal: value => localStorage.setItem(TOTAL_KEY, value),

    getStartTime: () => +localStorage.getItem(START_TIME_KEY) || 0,
    setStartTime: value => localStorage.setItem(START_TIME_KEY, value),

    getLastSubtraction: () => +localStorage.getItem(LAST_SUBTRACTION_KEY) || 0,
    setLastSubtraction: value => localStorage.setItem(LAST_SUBTRACTION_KEY, value)
};
