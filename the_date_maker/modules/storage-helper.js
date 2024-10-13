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

    localStorage.setItem('data', JSON.stringify(storageLocker))
}

const entryIdCheck = (entryId) => storageLocker.findIndex((item) => item.id === entryId)
