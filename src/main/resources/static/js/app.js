// Routing and Navigation Logic — con control de autenticación
import { isLoggedIn, isSectionProtected, openAuthModal, updateNavForSession } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.page-section');

    function navigateTo(sectionId) {
        if (isSectionProtected(sectionId) && !isLoggedIn()) {
            openAuthModal();
            history.replaceState(null, '', '#ranking');
            sections.forEach(sec => sec.classList.remove('active'));
            navLinks.forEach(link => link.classList.remove('active'));
            const rankingSection = document.getElementById('ranking');
            if (rankingSection) rankingSection.classList.add('active');
            const rankingLink = document.querySelector('.nav-links a[data-section="ranking"]');
            if (rankingLink) rankingLink.classList.add('active');
            return;
        }
        sections.forEach(sec => sec.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));
        const targetSection = document.getElementById(sectionId);
        if (targetSection) targetSection.classList.add('active');
        const activeLink = document.querySelector(`.nav-links a[data-section="${sectionId}"]`);
        if (activeLink) activeLink.classList.add('active');
    }

    function handleHashChange() {
        let hash = window.location.hash.substring(1);
        if (!hash) hash = 'ranking';
        navigateTo(hash);
    }

    window.addEventListener('hashchange', handleHashChange);

    window.addEventListener('sessionChanged', () => {
        updateNavForSession();
        handleHashChange();
    });

    updateNavForSession();
    handleHashChange();
});