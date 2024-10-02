import 'boxicons/css/boxicons.min.css';
import './sidebar.css';

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
    const calendarMain = document.getElementById('calendar-main');

    btn.addEventListener('click', () => {
        sidebar.classList.toggle('active'); 

        if (sidebar.classList.contains('active')) {
            calendarMain.style.left = '17.25rem';
            calendarMain.style.width = 'calc(100% - 17.25rem)';
          } else {
            calendarMain.style.left = '6.625rem';
            calendarMain.style.width = 'calc(100% - 6.625rem)';
          }
    });    
})
