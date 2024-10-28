import { v4 as uniqueId } from 'uuid';
import { handleSelect, handleEventWidget } from '/modules/click-handlers.js'
import { entryFormDisplayHelper } from '/components/insta_entry/insta_entry.js'

export { addInstaEntry }
export { buildInstaEntries }
export { deleteEntry }
export { editEntry }
export { updateEntry }

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

    if(index === -1) storageLocker.unshift(diaryEntry) 
    
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
        try {
            const enrtyContent = document.createElement('div')
            enrtyContent.classList.add('entry');
            enrtyContent.id = id;
            enrtyContent.innerHTML = `Event Name: ${name}<br><br>Description: ${description}<br><br>${time}`;
    
            const parentElement = document.getElementById(parent)
            parentElement.appendChild(enrtyContent)
            enrtyContent.addEventListener('click', handleSelect)
            enrtyContent.addEventListener('click', handleEventWidget)
        } catch(e) {
            console.log('hello', e)
        }
    });
}

const updateEntries = () => {
    const entryToUpdate = document.getElementById(currentEntry.id)
    entryToUpdate.innerHTML = `Event Name: ${currentEntry.name}<br><br>Description: ${currentEntry.description}<br><br>${currentEntry.time}`;
    entryToUpdate.style.display = 'none';
    setTimeout(() => entryToUpdate.style.display = '', 0);

    console.log(entryToUpdate.innerHTML);
    

    reset();
}

const deleteEntry = (entry) => {
    const index = entryIdCheck(entry.id);

    entry.remove();
    // at array index 'index' , remove 1 item (which is the entryelement)
    storageLocker.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(storageLocker));
}

const editEntry = (entry) => {
    const index = entryIdCheck(entry.id);

    console.log(entry.id);
    
    currentEntry = storageLocker[index];

    console.log(currentEntry.id);

    entryFormDisplayHelper();
}

const updateEntry = (newName, newDescription, newTime) => {
    const index = entryIdCheck(currentEntry.id);

    console.log(2);
    console.log(currentEntry.id);
    
    storageLocker[index] = {
        ...currentEntry,
        name: newName,
        description: newDescription,
        time: newTime,
    }

    console.log(storageLocker[index]);
    

    localStorage.setItem('data', JSON.stringify(storageLocker));
    updateEntries();
}

const reset = () => {
    currentEntry = {};
}

const entryIdCheck = (entryId) => storageLocker.findIndex((item) => item.id === entryId)