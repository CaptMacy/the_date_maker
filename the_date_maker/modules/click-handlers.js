import { deleteEntry, editEntry } from '/modules/storage-helper.js'
import { updateWeekDisplay } from '/modules/date-helper.js'

export { handleSelect }
export { handleEventPopUp }
export { handleCalendarView }

const handleSelect = (event) => {
    const selectedElement = document.querySelector('.selected');
    if(selectedElement) selectedElement.classList.remove('selected');

    event.target.classList.add('selected');
}

let currentWidget = null;

function handleEventPopUp(event) {
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

    const hideEventWidget = (e) => {
        // Check if the clicked element is not the widget and not a child of the widget
        if (!eventWidget.contains(e.target) && e.target.id !== eventWidget.id) {
            eventWidget.style.display = 'none'; // Hide the widget
            currentWidget = null;
            document.removeEventListener('click', hideEventWidget); // Remove listener after hiding
        }
    }
}

const handleCalendarView = (event) => {
    const viewOption = event.target.innerHTML;

    const dateContainer = document.getElementById('date-container');
    const hourGrid = document.getElementById('calendar-hour-sidebar');

    // const dayView = document.getElementById('calendar-day-view');
    const weekView = document.getElementById('calendar-week-view');
    const monthView = document.getElementById('calendar-month-view');
    // const yearView = document.getElementById('calendar-year-view');
    
    hourGrid.style.display = 'none';
    // dayView.style.display = 'none';
    weekView.style.display = 'none';
    monthView.style.display = 'none';
    // yearView.style.display = 'none';

    switch(viewOption) {
        case 'Day':
            console.log('not ready yet');
            break;
        case 'Week':
            weekView.style.display = 'grid';
            dateContainer.classList.remove('month');
            dateContainer.classList.add('week');
            updateWeekDisplay();
            hourGrid.style.display = 'grid';
            document.getElementById('display-week').style.display = 'inline-block';
            break;
        case 'Month':
            monthView.style.display = 'grid';
            dateContainer.classList.remove('week');
            dateContainer.classList.add('month');
            document.getElementById('display-week').style.display = 'none';
            break;
        case 'Year':
            console.log('not ready yet');
            break;
    }

}
