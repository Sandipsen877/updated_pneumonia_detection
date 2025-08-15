// Shared functionality across all pages
import { showLoading, showError, getCSRFToken } from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme toggle
    initThemeToggle();
    
    // Set active navigation links
    setActiveNavLinks();
    
    // Initialize auth buttons
    initAuthButtons();
    
    // Initialize language selector sync
    initLanguageSelectors();
    
    // Next button functionality
    initNextButton();
});

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    function applyTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
            icon?.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
            icon?.classList.replace('fa-moon', 'fa-sun');
        }
    }

    // Initialize theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        const isDark = !document.body.classList.contains('dark-theme');
        applyTheme(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Add animation
        this.classList.add('theme-toggle-active');
        setTimeout(() => {
            this.classList.remove('theme-toggle-active');
        }, 300);
    });
}

function setActiveNavLinks() {
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .sidebar-link').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPage || 
            (currentPage === '' && linkPath === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

function initAuthButtons() {
    // Sign in button
    document.querySelector('.btn-signin')?.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'auth.html?action=signup';
    });

    // Login button
    document.querySelector('.btn-login')?.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'auth.html?action=login';
    });

    // Logo refresh handler
    document.querySelectorAll('.logo-link, .logo-text-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.location.pathname.endsWith('index.html') || 
                window.location.pathname === '/') {
                e.preventDefault();
                window.location.href = 'index.html';
            }
        });
    });
}

function initLanguageSelectors() {
    // Sync language selectors between navbar and sidebar
    const syncSelectors = () => {
        const navbarSelect = document.getElementById('navbar-language');
        const sidebarSelect = document.getElementById('sidebar-language');
        
        if (navbarSelect && sidebarSelect) {
            navbarSelect.value = sidebarSelect.value;
            sidebarSelect.addEventListener('change', () => {
                navbarSelect.value = sidebarSelect.value;
            });
            navbarSelect.addEventListener('change', () => {
                sidebarSelect.value = navbarSelect.value;
            });
        }
    };

    // Wait for language.js to initialize
    setTimeout(syncSelectors, 300);
}

function initNextButton() {
    const nextButton = document.querySelector('.btn-next');
    if (!nextButton) return;

    nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        showLoading(true);
        window.location.href = 'detection.html';
    });
}

// Global error handler
window.addEventListener('error', function(e) {
    showError('An unexpected error occurred. Please try again.');
    console.error('Global error:', e.error);
});

// Make utility functions available globally
window.showLoading = showLoading;
window.showError = showError;
window.getCSRFToken = getCSRFToken;

