export { handleSelect }
export { handleEventPopUp }
export { handleWeekView }
export { handleMonthView }

import { deleteEntry, editEntry } from '/modules/storage-helper.js'

const handleSelect = (event) => {
    const selectedElement = document.querySelector('.selected');
    if(selectedElement) selectedElement.classList.remove('selected');

    event.target.classList.add('selected');
}

let currentWidget = null;

const handleEventPopUp = (event) => {
    const eventElement = document.getElementById(event.target.id)

    // this is exclusively used for the edit function
    const parent = event.currentTarget.parentElement;

    const rect = event.target.getBoundingClientRect()

    const eventWidget = document.createElement('div')
    eventWidget.innerHTML = event.target.innerHTML + `<br> <i class='bx bxs-edit-alt' id='edit-btn'></i>
    <i class='bx bxs-trash' id='delete-btn'></i>`
    eventWidget.classList.add('event-widget')
    eventWidget.style.left = `${rect.right - 100}px`
    eventWidget.style.top = `${rect.top - 60}px `
    eventWidget.id = event.target.id;
    
    if(currentWidget && currentWidget !== eventWidget) currentWidget.style.display = 'none';
    else if(currentWidget == eventWidget) return;

    eventElement.appendChild(eventWidget)
    
    currentWidget = eventWidget;

    document.removeEventListener('click', hideEventWidget)
    document.addEventListener('click', hideEventWidget)

    eventWidget.querySelector('#delete-btn').addEventListener('click', () => deleteEntry(eventElement));
    eventWidget.querySelector('#edit-btn').addEventListener('click', () => editEntry(eventElement, parent));

    function hideEventWidget(e) {
        // Check if the clicked element is not the widget and not a child of the widget
        if (!eventWidget.contains(e.target) && e.target.id !== eventWidget.id) {
            eventWidget.style.display = 'none'; // Hide the widget
            currentWidget = null;
            document.removeEventListener('click', hideEventWidget); // Remove listener after hiding
        }
    }
}

const handleWeekView = () => {
    const monthView = document.getElementById('calendar-month-view');
    const weekView = document.getElementById('calendar-week-view');
    console.log(monthView,'hello there week view');
    console.log(weekView,'hello there week view');
    monthView.style.display = 'none';
    weekView.style.display = 'grid';
}

const handleMonthView = () => {
    const monthView = document.getElementById('calendar-month-view');
    console.log(monthView,'hello there Month view');
    monthView.style.display = 'grid';
}