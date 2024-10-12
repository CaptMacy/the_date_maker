import './insta_entry.css'
export { entryFormDisplayHelper }

export function loadInstaEntries() {
    return fetch('/components/insta_entry/insta_entry.html')
        .then(response => response.text())
        .then(html => {
            const instaEntryForm = document.getElementById('insta-entry-form')
            instaEntryForm.innerHTML = html;
            console.log(html);
        })
    }

const entryFormDisplayHelper = (event) => {
    const formBody = document.querySelector('body')
    const entryForm = document.querySelector('.insta-entry-form')

    entryForm.classList.toggle('active')

    const handleClose = (e) => {
        console.log(e.key);
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

    const formName = document.createElement('div')
    formName.innerHTML = `Event Name: ${entryName.value}<br><br>Description: ${entryDescription.value}<br><br>${entryTime}`;
    e.target.appendChild(formName)
}

const buildInstaEntryForm = async() => {
    await loadInstaEntries();
}

buildInstaEntryForm()