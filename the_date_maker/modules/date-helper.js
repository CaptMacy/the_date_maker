import { handleSelect } from '/modules/click-handlers.js'
import { entryFormDisplayHelper } from '/components/insta_entry/insta_entry.js'
import { buildInstaEntries } from '/modules/storage-helper.js'

export { daysInMonth }
export { handleDateChange }
export { updateMonthDisplay }
export { daysInWeek }

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
    const calendar = document.getElementById('calendar-week-view');
    const options = { weekday: 'long' };

    currentDate.setHours(0, 0, 0, 0);
    const sunday = new Date(currentDate);
    sunday.setDate(currentDate.getDate() - currentDate.getDay());
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);

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

        if(day.getDate() == currentDay) dayElement.classList.add('currentDay');
    }
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