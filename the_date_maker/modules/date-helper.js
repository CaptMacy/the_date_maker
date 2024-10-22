export { isWeekend }
export { daysInMonth }
export { currentDay }
export { currentHour }
export { handleDateChange }
export { updateMonthDisplay }

import { handleSelect } from '/modules/click-handlers.js'
import { entryFormDisplayHelper } from '/components/insta_entry/insta_entry.js'

const isWeekend = (day) => day % 7 == 6 || day % 7 == 0;

let currentDate = new Date();

const currentDay = new Date().getDate();

const currentHour = new Date().getHours();

const daysInMonth = (year, month) => {
    if(year == null && month == null) {
        month = new Date().getMonth() + 1;
        year = new Date().getFullYear()
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
    
        console.log(dayElement.id);
        
        calendar.appendChild(dayElement);

        dayElement.addEventListener('click', handleSelect);
        dayElement.addEventListener('dblclick', entryFormDisplayHelper);

        if(day == currentDay) dayElement.classList.add('currentDay');
    }
}

function updateMonthDisplay() {
    const options = { year: 'numeric', month: 'long' };
    
    const displayMonth = document.getElementById('display-month')
    displayMonth.innerHTML = currentDate.toLocaleDateString('en-GB', options);
    
}

const handleDateChange = (event) => {
    // event.target.id == 'date-last' ? currentDate.setMonth(currentDate.getMonth() - 1) : currentDate.setMonth(currentDate.getMonth() + 1);

    if(event.target.id == 'date-last') {
        currentDate.setMonth(currentDate.getMonth() - 1)
        
    } else {
        currentDate.setMonth(currentDate.getMonth() + 1)
    }

    updateMonthDisplay();
    
    daysInMonth(currentDate.getFullYear(), currentDate.getMonth() + 1);
}