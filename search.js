document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const closeButton = document.getElementById("close-search");
    const recipeGrid = document.getElementById("recipe-grid");
    const resultsTitle = document.getElementById("results-title");
    const searchQuerySpan = document.getElementById("search-query");
    const noResults = document.getElementById("no-results");

    // Example recipes
    const recipes = [
        { title: "Delicious Pasta", prepTime: "20 mins", tags: ["vegan"], img: "https://via.placeholder.com/300x200" },
        { title: "Grilled Chicken", prepTime: "30 mins", tags: ["quick-meals"], img: "https://via.placeholder.com/300x200" },
        { title: "Vegan Salad", prepTime: "15 mins", tags: ["vegan"], img: "https://via.placeholder.com/300x200" },
    ];

    // Filter recipes based on search query
    const filterRecipes = (query) => {
        const lowerQuery = query.toLowerCase();
        return recipes.filter(recipe => recipe.title.toLowerCase().includes(lowerQuery));
    };

    // Render recipes
    const renderRecipes = (filteredRecipes) => {
        recipeGrid.innerHTML = "";
        if (filteredRecipes.length === 0) {
            noResults.classList.remove("hidden");
            resultsTitle.classList.add("hidden");
        } else {
            noResults.classList.add("hidden");
            resultsTitle.classList.remove("hidden");
            filteredRecipes.forEach(recipe => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
                    <img src="${recipe.img}" alt="${recipe.title}">
                    <h4>${recipe.title}</h4>
                    <p>Prep Time: ${recipe.prepTime}</p>
                `;
                recipeGrid.appendChild(card);
            });
        }
    };

    // Handle search
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value;
        searchQuerySpan.textContent = query;
        const filteredRecipes = filterRecipes(query);
        renderRecipes(filteredRecipes);
    });

    // Close button functionality
    closeButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Render initial recipes
    renderRecipes(recipes);
});
