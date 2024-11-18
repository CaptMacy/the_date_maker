import { v4 as uniqueId } from 'uuid';
import { handleSelect, handleEventPopUp } from '/modules/click-handlers.js';
import { entryFormDisplayHelper } from '/components/insta_entry/insta_entry.js';

export { addInstaEntry };
export { buildInstaEntries };
export { deleteEntry };
export { editEntry };

const storageLocker = JSON.parse(localStorage.getItem('data')) || [];
let currentEntry = {};

function addInstaEntry(name, description, time, parentElementId) {
    const index = entryIdCheck(currentEntry.id); // returns -1 if no match is found

    const diaryEntry = {
        parent: parentElementId,
        id: uniqueId(),
        name: name,
        description: description,
        time: time,
    };

    if(index === -1) storageLocker.unshift(diaryEntry) ;
        else {
            storageLocker[index] = {
                ...currentEntry,
                name: name,
                description: description,
                time: time,
            }
        };
    
    localStorage.setItem('data', JSON.stringify(storageLocker));

    buildInstaEntries();

    reset();
}

function buildInstaEntries() {
    //put together the event div and get parent element to append
    storageLocker.forEach(({parent, id, name, description, time}) => {
        try {
            const currentEntries = document.getElementById(id);
            if(currentEntries != null) currentEntries.remove();

            const enrtyContent = document.createElement('div');
            enrtyContent.classList.add('entry');
            enrtyContent.id = id;
            enrtyContent.innerHTML = `Event Name: ${name}<br><br>Description: ${description}<br><br>${time}`;
    
            const parentElement = document.getElementById(parent);
            if(parentElement == null) return;
            parentElement.appendChild(enrtyContent);
            enrtyContent.addEventListener('click', handleSelect);
            enrtyContent.addEventListener('click', handleEventPopUp);
        
        } catch(e) {
            console.log('an error occured', e);
        }
    });
}

const deleteEntry = (entry) => {
    const index = entryIdCheck(entry.id);
    console.log('deleeete');
    
    entry.remove();
    // at array index 'index' , remove 1 item (which is the entryelement)
    storageLocker.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(storageLocker));
}

// sets currententry id and calls make an entry form for user to make changes
const editEntry = (entry, parent) => {
    console.log('edit');
    const index = entryIdCheck(entry.id);

    currentEntry = storageLocker[index];

    entryFormDisplayHelper(parent);
}

const reset = () => {
    currentEntry = {};
}

const entryIdCheck = (entryId) => storageLocker.findIndex((item) => item.id === entryId);