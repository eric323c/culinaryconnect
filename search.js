// Firebase Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyC1n_23aCscqCgS3cx16rYfPFpK4IkLdT8",
    authDomain: "culinary-connect-8733e.firebaseapp.com",
    projectId: "culinary-connect-8733e",
    storageBucket: "culinary-connect-8733e.appspot.com",
    messagingSenderId: "336298434506",
    appId: "1:336298434506:web:98e0417c24ede7a955b933",
    measurementId: "G-ERKGQRFWK3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// DOM Elements
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const recipeGrid = document.getElementById("recipe-grid");
const addRecipeBtn = document.getElementById("add-recipe-btn");
const addRecipeModal = document.getElementById("add-recipe-modal");
const closeRecipeModal = document.getElementById("close-recipe-modal");
const addRecipeForm = document.getElementById("add-recipe-form");
const closeSearch = document.getElementById("close-search");

// Track User Login State
let currentUser = null;

onAuthStateChanged(auth, (user) => {
    currentUser = user;

    if (user) {
        // User is logged in
        document.getElementById("user-menu").classList.add("logged-in");
    } else {
        // User is not logged in
        document.getElementById("user-menu").classList.remove("logged-in");
    }
});

// Event Listeners
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
});
addRecipeBtn.addEventListener("click", () => {
    if (!currentUser) {
        alert("You must be logged in to add a recipe.");
    } else {
        addRecipeModal.classList.add("active");
    }
});
closeRecipeModal.addEventListener("click", () => addRecipeModal.classList.remove("active"));
addRecipeForm.addEventListener("submit", handleAddRecipe);
closeSearch.addEventListener("click", () => {
    window.location.href = "index.html";
});

// Fetch and Display Recipes
async function fetchRecipes(searchTerm = "") {
    recipeGrid.innerHTML = ""; // Clear previous results

    try {
        let q;
        if (searchTerm) {
            q = query(collection(db, "recipes"), where("title", "==", searchTerm));
        } else {
            q = query(collection(db, "recipes"));
        }

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            recipeGrid.innerHTML = `<p>No recipes found for "${searchTerm}"</p>`;
        } else {
            querySnapshot.forEach((doc) => {
                const recipe = doc.data();
                displayRecipeCard(recipe);
            });
        }
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

// Display a Recipe Card
function displayRecipeCard(recipe) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
    `;

    recipeGrid.appendChild(card);
}

// Handle Search
function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        fetchRecipes(searchTerm);
    }
}

// Handle Add Recipe
async function handleAddRecipe(event) {
    event.preventDefault();

    if (!currentUser) {
        alert("You must be logged in to add a recipe.");
        return;
    }

    const title = document.getElementById("recipe-title").value;
    const description = document.getElementById("recipe-description").value;
    const ingredients = document.getElementById("recipe-ingredients").value.split(",");
    const image = document.getElementById("recipe-image").value;

    try {
        await addDoc(collection(db, "recipes"), {
            title,
            description,
            ingredients,
            image,
            userId: currentUser.uid,
        });

        alert("Recipe added successfully!");
        addRecipeModal.classList.remove("active");
        addRecipeForm.reset();
        fetchRecipes(); // Refresh the grid
    } catch (error) {
        console.error("Error adding recipe:", error);
        alert("Failed to add recipe. Please try again.");
    }
}

// Initial Fetch
fetchRecipes();
