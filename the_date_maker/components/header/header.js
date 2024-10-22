import './header.css';
import { handleDateChange } from '/modules/date-helper.js'
import { updateMonthDisplay } from '/modules/date-helper.js'

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
    dateLast.addEventListener('click', (event) => handleDateChange(event));
    dateNext.addEventListener('click', (event) => handleDateChange(event));
}

buildHeader();