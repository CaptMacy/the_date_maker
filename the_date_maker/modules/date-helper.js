import { handleSelect } from '/modules/click-handlers.js'
import { entryFormDisplayHelper } from '/components/insta_entry/insta_entry.js'
import { buildInstaEntries } from '/modules/storage-helper.js'

export { daysInWeek }
export { daysInMonth }
export { updateMonthDisplay }
export { updateWeekDisplay }
export { handleDateDisplayChange }

const isWeekend = (day) => day % 7 == 6 || day % 7 == 0;

let currentDate = new Date();

const currentDay = new Date().getDate();

function daysInMonth(year, month, isFirstLoad) {
    if(year == null && month == null) {
        month = currentDate.getMonth() + 1;
        year = currentDate.getFullYear()
    }
    
    const days = new Date(year, month, 0).getDate()
    const divId = `${month}${year}`;

    const calendar = document.getElementById('calendar-month-view');

    calendar.innerHTML = '';

    for(let day = 1; day <= days; day++){
        const weekend = isWeekend(day);

        const dayElement = document.createElement('div');
        dayElement.id = `${divId}${day}`;
        dayElement.classList.add('day-of-week')
        weekend ? dayElement.classList.add('weekend-highlight') : '';
        dayElement.textContent = day;
        
        calendar.appendChild(dayElement);

        dayElement.addEventListener('click', handleSelect);
        dayElement.addEventListener('dblclick', entryFormDisplayHelper);

        if(day == currentDay) dayElement.classList.add('currentDay');
    }

    if(!isFirstLoad) buildInstaEntries();
}

const daysInWeek = (sunday) => {
    const calendar = document.getElementById('calendar-week-view');
    calendar.innerHTML = '';
    const options = { weekday: 'long' };

    if(sunday === undefined) {
        currentDate.setHours(0, 0, 0, 0);
        sunday = new Date(currentDate);
        sunday.setDate(currentDate.getDate() - currentDate.getDay());
    }
    
    for(let i = 0; i < 7; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('week-day', 'day-of-week');

        const day = new Date(sunday);
        day.setDate(day.getDate() + i)

        const dayName = document.createElement('span');
        dayName.classList.add('weekDayName');
        dayName.innerText = day.toLocaleDateString('en-GB', options) + ' ' + day.getDate();
        dayElement.appendChild(dayName);

        calendar.appendChild(dayElement);
        dayElement.addEventListener('click', handleSelect);

        if(day.getDate() == currentDay) dayElement.classList.add('currentDay');
    }
}

const handleDateDisplayChange = (event) => {
    const dateContainer = document.getElementById('date-container');

    if(dateContainer.classList.contains('week')) handleWeekChange(event);
    else if(dateContainer.classList.contains('month')) handleMonthChange(event);
}

const updateWeekDisplay = () => {
    const options = { weekday: 'long' };
    
    currentDate.setHours(0, 0, 0, 0);
    const sunday = new Date(currentDate);
    sunday.setDate(currentDate.getDate() - currentDate.getDay());

    const saturdayDate = new Date(sunday);
    saturdayDate.setDate(sunday.getDate() + 6);
    const sundayDate = sunday.getDate();

    const displayWeek = document.getElementById('display-week')
    displayWeek.innerHTML = sunday.toLocaleDateString('en-GB', options) + ' ' + sundayDate + ' ' + '-' + ' ' + saturdayDate.toLocaleDateString('en-GB', options) + ' ' + saturdayDate.getDate();
}

const handleWeekChange = (event) => {
    event.target.id == 'date-last' ? currentDate.setDate(currentDate.getDate() - 1 * 7) : currentDate.setDate(currentDate.getDate() + 1 * 7);

    updateWeekDisplay();

    daysInWeek(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
}

const updateMonthDisplay = () => {
    const options = { year: 'numeric', month: 'long' };
    
    const displayMonth = document.getElementById('display-month')
    displayMonth.innerHTML = currentDate.toLocaleDateString('en-GB', options);
}

const handleMonthChange = (event) => {
    event.target.id == 'date-last' ? currentDate.setMonth(currentDate.getMonth() - 1) : currentDate.setMonth(currentDate.getMonth() + 1);

    updateMonthDisplay();
    
    daysInMonth(currentDate.getFullYear(), currentDate.getMonth() + 1, false);
}