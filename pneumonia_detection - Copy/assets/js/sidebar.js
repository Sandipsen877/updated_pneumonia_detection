document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const body = document.body;

    function toggleSidebar() {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        body.classList.toggle('sidebar-open');
        
        // Store state in localStorage
        localStorage.setItem('sidebarOpen', sidebar.classList.contains('active'));
    }

    // Initialize sidebar state
    if (localStorage.getItem('sidebarOpen') === 'true') {
        toggleSidebar();
    }

    // Event listeners
    sidebarToggle?.addEventListener('click', toggleSidebar);
    sidebarClose?.addEventListener('click', toggleSidebar);
    sidebarOverlay?.addEventListener('click', toggleSidebar);

    // Close sidebar when clicking links on mobile
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                toggleSidebar();
            }
        });
    });

    // Sync language selectors is now handled by language.js
    // Close sidebar when window is resized above breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });
});

