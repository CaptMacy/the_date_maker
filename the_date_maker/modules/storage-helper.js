import { v4 as uniqueId } from 'uuid';

export { addInstaEntry }


const storageLocker = JSON.parse(localStorage.getItem('data')) || [];
let currentEntry = {}

const addInstaEntry = (name, description, time) =>  {
    const index = entryIdCheck(currentEntry.id) // returns -1 if not match is found

    const diaryEntry = {
        id: uniqueId,
        name: name,
        description: description,
        time: time,
    }

    if(index == -1) storageLocker.unshift(diaryEntry)
    
    console.log(storageLocker);
    
    localStorage.setItem('data', JSON.stringify(storageLocker))
}

const buildInstaEntries = () => {
    
    const formName = document.createElement('div')
    formName.innerHTML = `Event Name: ${entryName.value}<br><br>Description: ${entryDescription.value}<br><br>${entryTime.value}`;
    e.target.appendChild(formName)

    addInstaEntry(entryName.value, entryDescription.value, entryTime.value)
    console.log(localStorage);
}

const entryIdCheck = (entryId) => storageLocker.findIndex((item) => item.id === entryId)
