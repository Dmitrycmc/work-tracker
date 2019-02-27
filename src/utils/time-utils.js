
export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

export const format = val => {
    if (val < 10) return '0' + val;
    return val;
};

export const fromMs = milliseconds => {
    const fullSeconds = Math.floor(milliseconds / SECOND);
    const seconds = fullSeconds % (MINUTE / SECOND);
    const fullMinutes = Math.floor(fullSeconds / (MINUTE / SECOND));
    const minutes = fullMinutes % (HOUR / MINUTE);
    const hours = Math.floor(fullMinutes / (HOUR / MINUTE));

    return { hours, minutes, seconds };
};
