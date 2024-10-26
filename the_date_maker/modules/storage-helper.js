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
        const parentElement = document.getElementById(parent)
        parentElement.innerHTML = '';
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

const reset = () => {
    currentEntry = {};
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

    currentEntry = storageLocker[index];

    console.log(2, entry.id);

    storageLocker[index] = {
        ...entryFormDisplayHelper(entry.id),
        name: entryName.value,
        description: entryDescription.value,
        time: entryTime.value,
    }

    localStorage.setItem('data', JSON.stringify(storageLocker));
    buildInstaEntries();
    reset();
}

const updateEntry = () => {
    const index = entryIdCheck(currentEntry.id);

}

const entryIdCheck = (entryId) => storageLocker.findIndex((item) => item.id === entryId)