export const storage = {
    getMode: () => +localStorage.getItem('mode') || 0,
    setMode: value => localStorage.setItem('mode', value),
    getCurrent: () => +localStorage.getItem('current') || 0,
    setCurrent: value => localStorage.setItem('current', value),
    getTotal: () => +localStorage.getItem('total') || 0,
    setTotal: value => localStorage.setItem('total', value),
    getStartTime: () => +localStorage.getItem('start-time') || 0,
    setStartTime: value => localStorage.setItem('start-time', value)
};
