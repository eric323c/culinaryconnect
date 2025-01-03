document.addEventListener('DOMContentLoaded', () => {
    const heroSearchBar = document.getElementById('hero-search-bar');
    const searchSection = document.getElementById('search-section');
    const closeSearch = document.getElementById('close-search');
    const heroSection = document.querySelector('.hero');

    // Open Search Section
    heroSearchBar.addEventListener('click', () => {
        heroSection.classList.add('collapsed');
        searchSection.classList.add('active');
    });

    // Close Search Section
    closeSearch.addEventListener('click', () => {
        heroSection.classList.remove('collapsed');
        searchSection.classList.remove('active');
    });
});
