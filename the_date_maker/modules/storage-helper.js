import { v4 as uniqueId } from 'uuid';
import { handleSelect, handleEventWidget } from '/modules/click-handlers.js'

export { addInstaEntry }
export { buildInstaEntries }

const storageLocker = JSON.parse(localStorage.getItem('data')) || [];
let currentEntry = {}

const addInstaEntry = (name, description, time, parentElementId) =>  {
    const index = entryIdCheck(currentEntry.id) // returns -1 if no match is found

    console.log(index);
    
    const diaryEntry = {
        parent: parentElementId,
        id: uniqueId(),
        name: name,
        description: description,
        time: time,
    }

    if(index == -1) storageLocker.unshift(diaryEntry)
    
    localStorage.setItem('data', JSON.stringify(storageLocker))

    const enrtyContent = document.createElement('div')
    enrtyContent.classList.add('entry');
    enrtyContent.id = diaryEntry.id;
    
    enrtyContent.innerHTML = `Event Name: ${name}<br><br>Description: ${description}<br><br>${time}`;

    const parentElement = document.getElementById(parentElementId)
    parentElement.appendChild(enrtyContent)
    enrtyContent.addEventListener('click', handleSelect)
    enrtyContent.addEventListener('click', handleEventWidget)

    reset()
}

const buildInstaEntries = () => {
    //put together the event div and get parent element to append
    storageLocker.forEach(({parent, id, name, description, time}) => {
        
        const enrtyContent = document.createElement('div')
        enrtyContent.classList.add('entry');
        enrtyContent.id = id;
        enrtyContent.innerHTML = `Event Name: ${name}<br><br>Description: ${description}<br><br>${time}`;

        const parentElement = document.getElementById(parent)
        parentElement.appendChild(enrtyContent)
        enrtyContent.addEventListener('click', handleSelect)
        enrtyContent.addEventListener('click', handleEventWidget)
});
}

const reset = () => {
    currentEntry = {};
}

const entryIdCheck = (entryId) => storageLocker.findIndex((item) => item.id === entryId)