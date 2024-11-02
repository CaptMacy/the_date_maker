import './insta_entry.css'
import { addInstaEntry, buildInstaEntries, updateEntry } from '/modules/storage-helper.js'
export { entryFormDisplayHelper }

export function loadInstaEntries() {
    return fetch('/components/insta_entry/insta_entry.html')
        .then(response => response.text())
        .then(html => {
            const instaEntryForm = document.getElementById('insta-entry-form')
            instaEntryForm.innerHTML = html;
        })
    }

const entryFormDisplayHelper = (event) => {
    const formBody = document.querySelector('body')
    const entryForm = document.querySelector('.insta-entry-form')

    console.log('helper', event);
    
    entryForm.classList.toggle('active')

    const handleClose = (e) => {
        if(e.key == 'Escape') {
            entryForm.classList.remove('active')
            formBody.removeEventListener('keydown', handleClose)
        }

        if(e.key == 'Enter') {
            entryFormDataHandler(event)
            entryForm.classList.remove('active')
            formBody.removeEventListener('keydown', handleClose)
        }
    }

    formBody.addEventListener('keydown', handleClose)
}

const entryFormDataHandler = (e) => {
    const entryName = document.getElementById('event-name')
    const entryDescription = document.getElementById('event-description')
    const entryTime = document.getElementById('event-time')

    //e is undefined because it may be called through the edit function which doesnt pass an event in, if this is the case we call update entry with the new event details - see update fucntion
    if(e === undefined) {
        updateEntry(entryName.value, entryDescription.value, entryTime.value)
        return
    }
    
    const parentElement = document.getElementById(e.target.id)
    
    addInstaEntry(entryName.value, entryDescription.value, entryTime.value, parentElement.id)
}

const buildInstaEntryForm = async() => {
    await loadInstaEntries();
    
    buildInstaEntries()
}

document.addEventListener('DOMContentLoaded', () => {
    buildInstaEntryForm()
});
