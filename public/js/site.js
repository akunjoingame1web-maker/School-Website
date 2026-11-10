// Global Navigation & Common Utilities
document.addEventListener('DOMContentLoaded', () => {
    // Highlight Active Nav Link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath === href || (currentPath === '/' && href === '/')) {
            link.classList.add('active');
        }
    });
    
    console.log(" Bali Global Kinder School Web App Initialized.");
});
