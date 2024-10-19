export { handleSelect }
export { handleEventWidget }

const handleSelect = (event) => {
    const selectedElement = document.querySelector('.selected');
    if(selectedElement) selectedElement.classList.remove('selected');

    event.target.classList.add('selected');
}

const handleEventWidget = (event) => {

    const eventElement = document.getElementById(event.target.id)

    const rect = event.target.getBoundingClientRect()

    const eventWidget = document.createElement('div')
    eventWidget.innerHTML = event.target.innerHTML
    eventWidget.classList.add('event-widget')
    eventWidget.style.left = `${rect.right - 100}px`
    eventWidget.style.top = `${rect.top - 60}px`

    eventElement.appendChild(eventWidget)
}