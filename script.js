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
// Event Listeners for Buttons
document.getElementById("hero-search-bar").addEventListener("focus", () => {
    navigateToSearch();
});

// Import Firebase Authentication
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Initialize Firebase Authentication
const auth = getAuth();

// DOM Elements
const loginBtn = document.querySelector(".login-btn");
const signupBtn = document.querySelector(".secondary-btn");
const signupModal = document.getElementById("signup-modal");
const loginModal = document.getElementById("login-modal");
const closeSignupModal = document.getElementById("close-signup-modal");
const closeLoginModal = document.getElementById("close-login-modal");
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

// Show Modals
signupBtn.addEventListener("click", () => signupModal.style.display = "flex");
loginBtn.addEventListener("click", () => loginModal.style.display = "flex");

// Close Modals
closeSignupModal.addEventListener("click", () => signupModal.style.display = "none");
closeLoginModal.addEventListener("click", () => loginModal.style.display = "none");

// Handle Sign-Up
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Sign-Up Successful!");
    signupModal.style.display = "none";
    signupForm.reset();
  } catch (error) {
    alert("Error Signing Up: " + error.message);
  }
});

// Handle Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login Successful!");
    loginModal.style.display = "none";
    loginForm.reset();
    updateUI(auth.currentUser);
  } catch (error) {
    alert("Error Logging In: " + error.message);
  }
});

// Update UI Based on Auth State
function updateUI(user) {
  if (user) {
    loginBtn.textContent = "Logout";
    loginBtn.removeEventListener("click", showLoginModal);
    loginBtn.addEventListener("click", handleLogout);
  } else {
    loginBtn.textContent = "Login";
    loginBtn.addEventListener("click", showLoginModal);
    loginBtn.removeEventListener("click", handleLogout);
  }
}

// Show Login Modal
function showLoginModal() {
  loginModal.style.display = "flex";
}

// Handle Logout
async function handleLogout() {
  try {
    await signOut(auth);
    alert("Logged Out Successfully!");
    updateUI(null);
  } catch (error) {
    alert("Error Logging Out: " + error.message);
  }
}

// Listen to Auth State Changes
onAuthStateChanged(auth, (user) => {
  updateUI(user);
});


// Navigate to Search Page
function navigateToSearch() {
    document.querySelector(".hero").classList.add("collapsed");
    setTimeout(() => {
        window.location.href = "search.html";
    }, 500); // Match the CSS transition duration
}
