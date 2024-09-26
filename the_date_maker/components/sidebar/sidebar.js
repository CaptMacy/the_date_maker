import 'boxicons/css/boxicons.min.css';
import './sidebar.css';

const sidebar = document.getElementById('.sidebar');
const btn = document.getElementById('#btn');

export function loadSidebar() {
    return fetch('components/sidebar/sidebar.html')
        .then(response => response.text())
        .then(html => {
            console.log(html);
            
            const sidebarContainer = document.getElementById('sidebar');
            sidebarContainer.innerHTML = html;
        })
        .catch(err => console.log('failed to load sidebar', err));
}

export function loadSidebarStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheets';
    link.href = 'the_date_maker/components/sidebar/sidebar.css';
    document.head.appendChild(link);
}

document.addEventListener('DOMContentLoaded', () => {
    btn.addEventListener('click', () => {
        sidebar.classList.toggle('active'); 
    });
})
