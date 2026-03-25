// Routing and Navigation Logic

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.page-section');

    function navigateTo(sectionId) {
        // Hide all sections
        sections.forEach(sec => sec.classList.remove('active'));
        // Remove active class from navs
        navLinks.forEach(link => link.classList.remove('active'));

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Activate matching nav link
        const activeLink = document.querySelector(`.nav-links a[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Hash routing
    function handleHashChange() {
        let hash = window.location.hash.substring(1);
        if (!hash) hash = 'ranking'; // Default route
        navigateTo(hash);
    }

    // Listen to hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Initial check
    handleHashChange();
});
