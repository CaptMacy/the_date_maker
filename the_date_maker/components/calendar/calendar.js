import './calendar.css'
import {isWeekend} from '/modules/date-helper.js'

export function loadCalendar() {
    
    return fetch('components/calendar/calendar.html')
        .then(response => response.text())
        .then(html => {
            console.log(html);
            
            const calendar = document.getElementById('calendar-main')
            calendar.innerHTML = html
        })
        .catch(err => console.log('failed to load sidebar', err));
    }


const buildCalander = async() => {
    await loadCalendar();

    const calendar = document.getElementById('calendar');

    for(let day = 1; day< 31; day++){
        const weekend = isWeekend(day);

        calendar.insertAdjacentHTML('beforeend', `<div class='day ${weekend ? 'weekend' : ''}'>${day}</div>`);
    }
}

buildCalander();
