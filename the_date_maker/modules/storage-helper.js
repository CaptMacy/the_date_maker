import { v4 as uniqueId } from 'uuid';

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
    
    console.log(storageLocker);
    
    localStorage.setItem('data', JSON.stringify(storageLocker))
    buildInstaEntries();
    reset()
}

const buildInstaEntries = () => {
    storageLocker.forEach(({parent}) => {
        const parentElement = document.getElementById(parent)
        if(parentElement) parentElement.innerHTML = ''
    })

    storageLocker.forEach(({parent, id, name, description, time}) => {
        
        const formName = document.createElement('div')
        formName.id = id;
        formName.innerHTML = `Event Name: ${name}<br><br>Description: ${description}<br><br>${time}`;

        console.log(parent);
        console.log(formName);

        const parentElement = document.getElementById(parent)
        console.log(parentElement);
        
        parentElement.appendChild(formName)

    });
}

const reset = () => {
    currentEntry = {};
}

const entryIdCheck = (entryId) => storageLocker.findIndex((item) => item.id === entryId)