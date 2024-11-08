import './header.css';
import { handleDateChange, updateMonthDisplay } from '/modules/date-helper.js'
import { handleCalendarView } from '/modules/click-handlers.js'

export function loadHeader() {
    return fetch('components/header/header.html')
        .then(response => response.text())
        .then(html => {
            const header = document.getElementById('header')
            header.innerHTML = html            
        })
        .catch(err => {console.log('failed to load header', err)});
}

const buildHeader = async() => {
    await loadHeader();

    updateMonthDisplay();
    
    const dateLast = document.getElementById('date-last')
    const dateNext = document.getElementById('date-next')
    const weekView = document.getElementById('week-btn')
    const monthView = document.getElementById('month-btn')
    dateLast.addEventListener('click', (event) => handleDateChange(event));
    dateNext.addEventListener('click', (event) => handleDateChange(event));
    weekView.addEventListener('click', (event) => handleCalendarView(event));
    monthView.addEventListener('click', (event) => handleCalendarView(event));
}

buildHeader();