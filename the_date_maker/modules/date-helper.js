export { isWeekend }
export { daysInMonth }
export { currentDay }
export { currentHour }
export { getDisplayMonth }
export { getDisplayYear }

const isWeekend = (day) => day % 7 == 6 || day % 7 == 0;

const daysInMonth = (year, month) => {
    if(year == null && month == null) {
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();

        return new Date(year, month, 0).getDate()
    }
    else return new Date(year, month, 0).getDate();
}

const currentDay = new Date().getDate();

const currentHour = new Date().getHours();

const getDisplayMonth = () => {
    const date = new Date()
    return new Intl.DateTimeFormat('en',{
        month: 'long',
    }).format(date)
}

const getDisplayYear = () => {
    const date = new Date()
    return new Intl.DateTimeFormat('en',{
        year: 'numeric',
    }).format(date)
}