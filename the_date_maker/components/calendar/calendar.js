import './calendar.css'
import { isWeekend } from '/modules/date-helper.js'
import { daysInMonth } from '/modules/date-helper.js'
import { currentDay } from '/modules/date-helper.js'
import { entryFormHelper } from '/components/insta_entry/insta_entry.js'
// import { currentHour } from '/modules/date-helper.js'

export function loadCalendar() {
    return fetch('components/calendar/calendar.html')
        .then(response => response.text())
        .then(html => {
            const calendar = document.getElementById('calendar-main')
            calendar.innerHTML = html
        })
        .catch(err => console.log('failed to load calendar', err));
    }

// build calendar main view/month view
const buildCalanderMonthView = async() => {
    await loadCalendar();
    const calendar = document.getElementById('calendar-month-view');

    for(let day = 1; day <= daysInMonth(); day++){
        const weekend = isWeekend(day);

        const dayElement = document.createElement('div');
        dayElement.classList.add('day-of-week')
        weekend ? dayElement.classList.add('weekend-highlight') : '';
        dayElement.textContent = day;
        
        calendar.appendChild(dayElement);

        dayElement.addEventListener('click', handleSelect);
        dayElement.addEventListener('dblclick', entryFormHelper);

        if(day == currentDay) dayElement.classList.add('currentDay');
    }
}

// const buildCalendarDayView = () => {
//     const calendar = document.getElementById('calendar-day-view')
//     const hourContainer = document.createElement('div')
//     hourContainer.classList.add('hour-container')
//     calendar.appendChild(hourContainer)
    
//     for(let hour = 1; hour <= 24; hour++) {
//         const hourElement = document.createElement('div')
//         hourElement.classList.add('hour')
//         hourElement.textContent = hour;

//         hourContainer.appendChild(hourElement)
//     }
// }

const handleSelect = (event) => {
    const selectedElement = document.querySelector('.selected');

    if(selectedElement) selectedElement.classList.remove('selected');

    event.target.classList.add('selected');
}

buildCalanderMonthView();
