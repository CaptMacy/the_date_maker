import 'boxicons'
import './sidebar.css'

export function loadSidebar() {
    fetch('components/sidebar/sidebar.html')
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