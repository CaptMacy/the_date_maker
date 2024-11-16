import './header.css';
import { handleDateDisplayChange, updateMonthDisplay } from '/modules/date-helper.js';
import { handleCalendarView } from '/modules/click-handlers.js';

export function loadHeader() {
    return fetch('components/header/header.html')
        .then(response => response.text())
        .then(html => {
            const header = document.getElementById('header');
            header.innerHTML = html;
        })
        .catch(err => {console.log('failed to load header', err)});
}

const buildHeader = async() => {
    await loadHeader();

    updateMonthDisplay();

    const dateChangeBtns = document.querySelectorAll('#date-last, #date-next');

    dateChangeBtns.forEach(btn => {
        btn.addEventListener('click', (event) => handleDateDisplayChange(event));
    });

    const calendarViewOptionBtns = document.querySelectorAll('#day-btn, #week-btn, #month-btn, #year-btn');

    calendarViewOptionBtns.forEach(btn => {
        btn.addEventListener('click', (event) => handleCalendarView(event));
    });
}

buildHeader();