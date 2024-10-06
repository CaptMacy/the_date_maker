import './calendar.css'
import { isWeekend } from '/modules/date-helper.js'
import { daysInMonth } from '/modules/date-helper.js'
import { currentDay } from '/modules/date-helper.js'
import { currentHour } from '/modules/date-helper.js'

export function loadCalendar() {
    return fetch('components/calendar/calendar.html')
        .then(response => response.text())
        .then(html => {
            const calendar = document.getElementById('calendar-main')
            calendar.innerHTML = html
        })
        .catch(err => console.log('failed to load sidebar', err));
    }

// build calendar main view/month view
const buildCalanderMonthView = async() => {
    await loadCalendar();
    const calendar = document.getElementById('calendar-month-view');

    for(let day = 1; day <= daysInMonth(2024, 10); day++){
        const weekend = isWeekend(day);

        const dayElement = document.createElement('div');
        dayElement.classList.add('day-of-week')
        weekend ? dayElement.classList.add('weekend-highlight') : '';
        dayElement.textContent = day;
        
        calendar.appendChild(dayElement);

        dayElement.addEventListener('click', handleSelect);

        if(day == currentDay) dayElement.classList.add('currentDay');
    }
}

const buildCalendarDayView = () => {
    const calendar = document.getElementById('calendar-day-view')
    const hourContainer = document.createElement('div')
    hourContainer.classList.add('hour-container')
    calendar.appendChild(hourContainer)

    console.log(1111);
    console.log(hourContainer);
    

    for(let hour = 1; hour <= 24; hour++) {
        const hourElement = document.createElement('div')
        hourElement.classList.add('hour')
        hourElement.textContent = hour;

        hourContainer.appendChild(hourElement)

        console.log(2);
        
    }
    console.log(3);
    
}

const handleSelect = (event) => {
    const selectedElement = document.querySelector('.selected');

    if(selectedElement) selectedElement.classList.remove('selected');
    buildCalendarDayView();

    event.target.classList.add('selected');
}

buildCalanderMonthView();
