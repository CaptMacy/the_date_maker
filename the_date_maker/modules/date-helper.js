export { isWeekend }
export { daysInMonth }
export { currentDay }
export { currentHour }

const isWeekend = (day) => day % 7 == 6 || day % 7 == 0;

const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

const currentDay = new Date().getDate();

const currentHour = new Date().getHours();