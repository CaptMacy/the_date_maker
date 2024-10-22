export { handleSelect }
export { handleEventWidget }

const handleSelect = (event) => {
    const selectedElement = document.querySelector('.selected');
    if(selectedElement) selectedElement.classList.remove('selected');

    event.target.classList.add('selected');
}

let currentWidget = null;

const handleEventWidget = (event) => {

    const eventElement = document.getElementById(event.target.id)

    const rect = event.target.getBoundingClientRect()

    const eventWidget = document.createElement('div')
    eventWidget.innerHTML = event.target.innerHTML
    eventWidget.classList.add('event-widget')
    eventWidget.style.left = `${rect.right - 100}px`
    eventWidget.style.top = `${rect.top - 60}px `
    eventWidget.id = event.target.id;

    console.log(1);
    console.log(currentWidget);
    console.log(eventWidget);
    
    if(currentWidget && currentWidget !== eventWidget) currentWidget.style.display = 'none';
    else if(currentWidget == eventWidget) return;
    
    console.log(2);
    console.log(currentWidget === eventWidget);
    console.log(eventWidget);

    eventElement.appendChild(eventWidget)
    
    currentWidget = eventWidget;

    document.removeEventListener('click', hideEventWidget)
    document.addEventListener('click', hideEventWidget)

    function hideEventWidget(e) {
        // Log clicked element for debugging
        console.log('Clicked element:', e.target);

        // Check if the clicked element is not the widget and not a child of the widget
        if (!eventWidget.contains(e.target) && e.target.id !== eventWidget.id) {
            eventWidget.style.display = 'none'; // Hide the widget
            currentWidget = null;
            document.removeEventListener('click', hideEventWidget); // Remove listener after hiding
        }
    }
}