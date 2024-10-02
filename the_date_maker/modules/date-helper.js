export { isWeekend }
export { daysInMonth }

const isWeekend = (day) => day % 7 == 6 || day % 7 == 0;

const daysInMonth = (year, month) => new Date(year, month, 0).getDate();