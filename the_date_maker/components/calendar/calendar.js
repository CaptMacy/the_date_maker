import './calendar.css'
import { isWeekend } from '/modules/date-helper.js'
import { daysInMonth } from '/modules/date-helper.js'
import { today } from '/modules/date-helper.js'

export function loadCalendar() {
    return fetch('components/calendar/calendar.html')
        .then(response => response.text())
        .then(html => {
            const calendar = document.getElementById('calendar-main')
            calendar.innerHTML = html
        })
        .catch(err => console.log('failed to load sidebar', err));
    }

const buildCalander = async() => {
    await loadCalendar();
    const calendar = document.getElementById('calendar');

    for(let day = 1; day <= daysInMonth(2024, 10); day++){
        const weekend = isWeekend(day);

        const dayElement = document.createElement('div');
        dayElement.classList.add('day-of-week')
        weekend ? dayElement.classList.add('weekend-highlight') : '';
        dayElement.textContent = day;
        
        calendar.appendChild(dayElement);

        dayElement.addEventListener('click', handleSelect);

        if(day == today) dayElement.classList.add('today');
    }
}

const handleSelect = (event) => {
    const selectedElement = document.querySelector('.selected');

    if(selectedElement) selectedElement.classList.remove('selected');

    event.target.classList.add('selected');
}

buildCalander();
