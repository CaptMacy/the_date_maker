export { handleSidebarWidth }

const handleSidebarWidth = (sidebar) => {
    const calendarMain = document.getElementById('calendar-main');
    const header = document.getElementById('header');

    if (sidebar.classList.contains('active')) {
        
        calendarMain.style.left = '17.25rem';
        calendarMain.style.width = 'calc(100% - 17.25rem)';
        header.style.left = '17.25rem';
        header.style.width = 'calc(100% - 17.25rem)';
    } else {
        calendarMain.style.left = '6.625rem';
        calendarMain.style.width = 'calc(100% - 6.625rem)';
        header.style.left = '6.625rem';
        header.style.width = 'calc(100% - 6.625rem';
    }
}