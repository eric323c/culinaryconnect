document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-btn");
    const closeButton = document.getElementById("close-btn");
    const recipeGrid = document.getElementById("recipe-grid");
    const searchResultsTitle = document.getElementById("search-results-title");
    const searchQuerySpan = document.getElementById("search-query");
    const filters = document.querySelectorAll(".filter-icon");

    const recipes = [
        { title: "Delicious Pasta", prepTime: "20 mins", tags: ["vegan", "quick-meals"] },
        { title: "Grilled Chicken", prepTime: "30 mins", tags: ["gluten-free"] },
        { title: "Vegan Salad", prepTime: "15 mins", tags: ["vegan"] },
        { title: "Grilled Cheese Sandwich", prepTime: "10 mins", tags: ["quick-meals"] },
        { title: "Spaghetti Carbonara", prepTime: "25 mins", tags: [] },
        { title: "Vegan Tacos", prepTime: "15 mins", tags: ["vegan", "favorites"] },
    ];

    // Display recipes in the grid
    const displayRecipes = (filteredRecipes) => {
        recipeGrid.innerHTML = ""; // Clear previous results
        if (filteredRecipes.length === 0) {
            recipeGrid.innerHTML = `<p>No recipes found. Try a different search or filter.</p>`;
            return;
        }
        filteredRecipes.forEach(recipe => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="https://via.placeholder.com/300x200" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <p>Prep Time: ${recipe.prepTime}</p>
            `;
            recipeGrid.appendChild(card);
        });
    };

    // Filter recipes based on input or tags
    const filterRecipes = (query = "", tag = "") => {
        const lowerQuery = query.toLowerCase();
        return recipes.filter(recipe => {
            const matchesQuery = recipe.title.toLowerCase().includes(lowerQuery);
            const matchesTag = tag ? recipe.tags.includes(tag) : true;
            return matchesQuery && matchesTag;
        });
    };

    // Handle search input and button
    const handleSearch = () => {
        const query = searchInput.value.trim();
        searchQuerySpan.textContent = query;
        searchResultsTitle.classList.remove("hidden");
        const filteredRecipes = filterRecipes(query);
        displayRecipes(filteredRecipes);
    };

    // Handle filter clicks
    filters.forEach(filter => {
        filter.addEventListener("click", () => {
            const tag = filter.getAttribute("data-filter");
            searchQuerySpan.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
            searchResultsTitle.classList.remove("hidden");
            const filteredRecipes = filterRecipes("", tag);
            displayRecipes(filteredRecipes);
        });
    });

    // Close button functionality
    closeButton.addEventListener("click", () => {
        window.location.href = "index.html"; // Redirect back to the hero section
    });

    // Event listener for search input and button
    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") handleSearch();
    });
    searchButton.addEventListener("click", handleSearch);

    // Initialize with no recipes displayed
    displayRecipes([]);
});
