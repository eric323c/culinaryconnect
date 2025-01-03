// Selectors
const searchInput = document.getElementById("search-input");
const closeSearchButton = document.getElementById("close-search");
const searchResults = document.getElementById("search-results");

// Function to close the search section
function closeSearchSection() {
    window.location.href = "index.html"; // Redirect back to the main page
}

// Event listener for the close button
closeSearchButton.addEventListener("click", closeSearchSection);

// Event listener for the search input
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    // Simulated recipes (replace with real API or data)
    const recipes = [
        { title: "Delicious Pasta", prepTime: "20 mins", tags: ["quick-meals"] },
        { title: "Grilled Chicken", prepTime: "30 mins", tags: ["gluten-free", "quick-meals"] },
        { title: "Vegan Salad", prepTime: "15 mins", tags: ["vegan"] },
        { title: "Spaghetti Carbonara", prepTime: "25 mins", tags: [] },
        { title: "Vegan Tacos", prepTime: "15 mins", tags: ["vegan", "quick-meals"] },
    ];

    if (query === "") {
        searchResults.innerHTML = "<h3>Start searching for recipes!</h3>";
    } else {
        const filteredRecipes = recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(query)
        );

        if (filteredRecipes.length > 0) {
            searchResults.innerHTML = filteredRecipes
                .map(
                    recipe => `
                <div class="card">
                    <img src="https://via.placeholder.com/300x200" alt="${recipe.title}">
                    <h3>${recipe.title}</h3>
                    <p>Prep Time: ${recipe.prepTime}</p>
                </div>`
                )
                .join("");
        } else {
            searchResults.innerHTML = `<h3>No results found for "${query}"</h3>`;
        }
    }
});

