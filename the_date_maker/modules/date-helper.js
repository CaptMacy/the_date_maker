export { isWeekend }
export { daysInMonth }
export { currentDay }
export { currentHour }
export { getDisplayMonth }
export { getDisplayYear }
export { handleDateChange }

const isWeekend = (day) => day % 7 == 6 || day % 7 == 0;

const daysInMonth = (year, month) => {
    const calendarDivId = {};
    if(year == null && month == null) {
        month = new Date().getMonth() + 1;
        year = new Date().getFullYear();
    }
        
        const days = new Date(year, month, 0).getDate()
        const divId = `${month}${year}`;

        calendarDivId.id = divId
        calendarDivId.days = days

        return calendarDivId
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

const handleDateChange = (event) => {
    if(event.target.id == 'date-last') {
        console.log(event.target.id);
        
    }
    else console.log(event.target.id);
    
}