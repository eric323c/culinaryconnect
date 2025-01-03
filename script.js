// Selectors
const heroSearchBar = document.getElementById("hero-search-bar");

// Function to navigate to the search page
function navigateToSearchPage() {
    // Redirect to the search.html page
    window.location.href = "search.html";
}

// Event listener for the hero search bar
heroSearchBar.addEventListener("click", navigateToSearchPage);

