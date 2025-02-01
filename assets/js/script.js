// Go to Home
function goHome() {
    window.location.href = "index.html"; // Go to the home page in the root directory
}

// Toggle Profile Options Dropdown
function toggleProfileOptions() {
    const profileOptions = document.getElementById("profile-options");
    profileOptions.style.display = profileOptions.style.display === "block" ? "none" : "block";
}

// Handle Profile Navigation
function goToProfile() {
    window.location.href = "profile.html"; // Corrected to the actual profile page URL
}

// Handle Settings Navigation
function goToSettings() {
    window.location.href = "settings.html"; // Corrected to the actual settings page URL
}

// Toggle Login/Logout Button based on User Authentication
function toggleLoginLogout() {
    const loginLogoutBtn = document.getElementById("login-logout-btn");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        localStorage.setItem("isLoggedIn", "false"); // Log out the user
        loginLogoutBtn.innerText = "Log In";
        alert("You have been logged out.");
    } else {
        localStorage.setItem("isLoggedIn", "true"); // Log in the user
        loginLogoutBtn.innerText = "Log Out";
        alert("You are logged in.");
    }
}

// Check Login Status on Page Load
document.addEventListener("DOMContentLoaded", () => {
    const loginLogoutBtn = document.getElementById("login-logout-btn");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // Set initial button text based on login status
    if (isLoggedIn === "true") {
        loginLogoutBtn.innerText = "Log Out";
    } else {
        loginLogoutBtn.innerText = "Log In";
    }
});

// Logout Function
function logout() {
    localStorage.setItem("isLoggedIn", "false");  // Clear login status
    window.location.href = 'login.html';  // Redirect to login page
}

// Search Form Submission Handler
function submitSearch(event) {
    event.preventDefault();  // Prevent form submission

    const location = document.getElementById('location').value;
    const propertyType = document.getElementById('propertyType').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;

    const searchData = {
        location,
        propertyType,
        minPrice,
        maxPrice
    };

    // Example: Log search data for review or send it to the backend/API for results
    console.log(searchData);
    // Redirect or make an API call to fetch search results
}

// Redirect Functions
function redirectToSearchPage() {
    window.location.href = 'pages/search.html';  // Redirect to the search page
}

function redirectToListPage() {
    window.location.href = 'pages/list-property.html';  // Redirect to the property listing page
}
