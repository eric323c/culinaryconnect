// Event Listeners for Buttons
document.getElementById("hero-search-bar").addEventListener("focus", () => {
  navigateToSearch();
});

// Navigate to Search Page
function navigateToSearch() {
  // Simulate the hero section sliding away
  document.querySelector(".hero").classList.add("collapsed");
  setTimeout(() => {
    window.location.href = "search.html"; // Redirect to search.html
  }, 500); // Match the CSS transition duration
}

// Browse Categories Button Logic
function browseCategories() {
  alert("Browse Categories clicked! Add logic to handle browsing categories.");
}

// Explore Recipes Button Logic
function exploreRecipes() {
  alert("Explore Recipes clicked! Add logic to explore recipes.");
}
