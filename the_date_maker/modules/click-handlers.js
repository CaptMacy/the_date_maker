export { handleSelect }

const handleSelect = (event) => {
    const selectedElement = document.querySelector('.selected');
    if(selectedElement) selectedElement.classList.remove('selected');

    event.target.classList.add('selected');
}