document.addEventListener("DOMContentLoaded", () => {
    const heroSearchBar = document.getElementById("hero-search-bar");
    const heroSection = document.querySelector(".hero");

    heroSearchBar.addEventListener("focus", () => {
        // Animate the hero section collapsing and transition to the search section
        heroSection.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        heroSection.style.transform = "translateY(-100%)";
        heroSection.style.opacity = "0";

        setTimeout(() => {
            window.location.href = "search.html"; // Redirect to search.html
        }, 500); // Wait for the animation to complete before redirecting
    });
});
