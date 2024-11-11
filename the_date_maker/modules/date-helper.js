export { daysInMonth }
export { handleDateChange }
export { updateMonthDisplay }
export { daysInWeek }

import { handleSelect } from '/modules/click-handlers.js'
import { entryFormDisplayHelper } from '/components/insta_entry/insta_entry.js'
import { buildInstaEntries } from '/modules/storage-helper.js'

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

const daysInWeek = () => {
    currentDate.setHours(0, 0, 0, 0);
    const sunday = new Date(currentDate);
    sunday.setDate(currentDate.getDate() - currentDate.getDay());
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);

    console.log(sunday);
    console.log(sunday.getDate() + 1);
    console.log(saturday);
}

const updateMonthDisplay = () => {
    const options = { year: 'numeric', month: 'long' };
    
    const displayMonth = document.getElementById('display-month')
    displayMonth.innerHTML = currentDate.toLocaleDateString('en-GB', options);
}

const handleDateChange = (event) => {
    event.target.id == 'date-last' ? currentDate.setMonth(currentDate.getMonth() - 1) : currentDate.setMonth(currentDate.getMonth() + 1);

    updateMonthDisplay();
    
    daysInMonth(currentDate.getFullYear(), currentDate.getMonth() + 1, false);
}