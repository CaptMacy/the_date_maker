import { v4 as uniqueId } from 'uuid';

export { addInstaEntry }


const storageLocker = JSON.parse(localStorage.getItem('data')) || [];
let currentEntry = {}

const addInstaEntry = (name, description, time) =>  {

    const diaryEntry = {
        name: name,
        description: description,
        time: time,
    }

    storageLocker.unshift(diaryEntry)

    console.log(storageLocker);
    

    localStorage.setItem('data', JSON.stringify(storageLocker))
}

const entryIdCheck = (entryId) => storageLocker.findIndex((item) => item.id === entryId)
