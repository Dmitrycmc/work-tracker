export const format = val => {
  if (val < 10) return '0' + val;
  return val;
}

export const fromMs = milliseconds => {
  const fullSeconds = Math.floor(milliseconds / 1000);
  const seconds = fullSeconds % 60;
  const fullMinutes = Math.floor(fullSeconds / 60); 
  const minutes = fullMinutes % 60;
  const hours = Math.floor(fullMinutes / 60);
  
  return {hours, minutes, seconds};
}
