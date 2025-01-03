import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC1n_23aCscqCgS3cx16rYfPFpK4IkLdT8",
  authDomain: "culinary-connect-8733e.firebaseapp.com",
  projectId: "culinary-connect-8733e",
  storageBucket: "culinary-connect-8733e.appspot.com",
  messagingSenderId: "336298434506",
  appId: "1:336298434506:web:98e0417c24ede7a955b933",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch and Display Recipes
async function fetchRecipes() {
  const recipesRef = collection(db, "recipes");
  const querySnapshot = await getDocs(recipesRef);

  const recipesContainer = document.getElementById("recipes-container");
  recipesContainer.innerHTML = ""; // Clear previous recipes

  querySnapshot.forEach((doc) => {
    const recipe = doc.data();
    recipesContainer.innerHTML += `
      <div class="recipe-card">
        <img src="${recipe.imageUrl}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <p>${recipe.description}</p>
      </div>
    `;
  });
}

// Add Recipe to Firestore
const recipeForm = document.getElementById("recipe-form");
recipeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("recipe-title").value;
  const description = document.getElementById("recipe-description").value;
  const category = document.getElementById("recipe-category").value;

  try {
    await addDoc(collection(db, "recipes"), {
      title,
      description,
      category,
      imageUrl: "https://via.placeholder.com/300x200", // Placeholder for now
    });

    alert("Recipe added successfully!");
    fetchRecipes(); // Refresh the recipe list
  } catch (error) {
    console.error("Error adding recipe:", error.message);
  }
});

// Initialize Page
fetchRecipes();
