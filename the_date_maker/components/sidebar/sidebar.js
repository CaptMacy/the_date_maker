import 'boxicons/css/boxicons.min.css';
import './sidebar.css';
import { handleSidebarWidth } from '/modules/sidebar-helper.js';

export function loadSidebar() {
    return fetch('components/sidebar/sidebar.html')
        .then(response => response.text())
        .then(html => {
            const sidebarContainer = document.getElementById('sidebar');
            sidebarContainer.innerHTML = html;
        })
        .catch(err => console.log('failed to load sidebar', err));
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadSidebar();
    const sidebar = document.querySelector('.sidebar');
    const btn = document.getElementById('btn');

    btn.addEventListener('click', () => {
        sidebar.classList.toggle('active'); 

        handleSidebarWidth(sidebar);
    });    
})
