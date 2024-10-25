import './calendar.css'
import { daysInMonth } from '/modules/date-helper.js'

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
const begin = async() => {
    await loadCalendar();

    daysInMonth(null, null, true);
}

begin();
