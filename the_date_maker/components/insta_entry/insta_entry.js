import './insta_entry.css'
export { entryFormHelper }

export function loadInstaEntries() {
    return fetch('/components/insta_entry/insta_entry.html')
        .then(response => response.text())
        .then(html => {
            const instaEntryForm = document.getElementById('insta-entry-form')
            instaEntryForm.innerHTML = html;
            console.log(html);
        })
    }

const entryFormHelper = () => {
    const entryForm = document.querySelector('.insta-entry-form')
    entryForm.classList.toggle('active')

    const formBody = document.querySelector('body')

    const handleClose = (e) => {
        console.log(e.key);
        entryForm.classList.remove('active')

        formBody.removeEventListener('keydown', handleClose)
    }

    formBody.addEventListener('keydown', handleClose)
}

const buildInstaEntryForm = async() => {
    await loadInstaEntries();
}

buildInstaEntryForm()