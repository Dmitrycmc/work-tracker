export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

export const format = val => {
    if (val < 10) return '0' + val;
    return val.toString();
};

export const fromMs = milliseconds => {
    const fullSeconds = Math.floor(milliseconds / SECOND);
    const seconds = fullSeconds % (MINUTE / SECOND);
    const fullMinutes = Math.floor(fullSeconds / (MINUTE / SECOND));
    const minutes = fullMinutes % (HOUR / MINUTE);
    const hours = Math.floor(fullMinutes / (HOUR / MINUTE));

    return { hours, minutes, seconds };
};

export const minutesToMs = minutes => minutes * MINUTE;

/***
 * @param {Date} date
 * @returns {number[0-6]}
 * 0 - Monday
 * ...
 * 6 - Sunday
 */
const dateToDayOfWeek = date => (date.getDay() || 7) - 1;

export const getLastMonday = () => {
    const date = new Date();
    const dayOfWeek = dateToDayOfWeek(date);
    const dayOfMonth = date.getDate();
    date.setDate(dayOfMonth - dayOfWeek);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
}

export const getFullWeeksSince = date => {
    const now = Date.now();
    const difference = now - date;
    return Math.floor(difference / WEEK);
}

/**
 * @param {number | string} ms
 * @param {number | string} minutes
 * @return {number} (ms + minutes) im ms
 */
export const addMinutesToMs = (ms, minutes) => + ms + minutes * MINUTE;

export const timeToString = (negative, hours, minutes) => {
    const minusStr = negative ? '-' : '';
    const minutesStr = minutes ? `${minutes}m` : '';
    const hoursStr = hours ? `${hours}h` : '';

    const hoursMinutesStr = hoursStr + minutesStr;

    return minusStr + hoursMinutesStr || '0m';

}