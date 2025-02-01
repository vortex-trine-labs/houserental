// JavaScript for Header Functionality
function goHome() {
    window.location.href = '/index.html'; // Redirect to the home page
}

function toggleProfileOptions() {
    const profileOptions = document.getElementById('profile-options');
    profileOptions.style.display = profileOptions.style.display === 'block' ? 'none' : 'block';
}

function goToProfile() {
    window.location.href = 'profile.html'; // Redirect to the profile page
}

function goToSettings() {
    window.location.href = 'settings.html'; // Redirect to the settings page
}

function toggleLoginLogout() {
    const loginLogoutBtn = document.getElementById('login-logout-btn');
    if (loginLogoutBtn.textContent === 'Log In') {
        loginLogoutBtn.textContent = 'Log Out';
        // Add logic for logging in (e.g., redirect to login page)
        window.location.href = '/login.html';
    } else {
        loginLogoutBtn.textContent = 'Log In';
        // Add logic for logging out (e.g., clear session and redirect to home)
        logoutUser();
    }
}

// Logout function
function logoutUser() {
    fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '../index.html'; // Redirect to home after logout
        }
    })
    .catch(error => console.error('Error logging out:', error));
}

// JavaScript for Property Details
async function populatePropertyDetails(propertyId) {
    try {
        // Fetch property details from the backend
        const response = await fetch(`/api/properties/${propertyId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch property details');
        }
        const property = await response.json();

        // Populate the DOM with property details
        document.getElementById('property-image').src = property.image;
        document.getElementById('property-title').textContent = property.title;
        document.getElementById('property-description').textContent = property.description;
        document.getElementById('property-location').textContent = property.location;
        document.getElementById('property-price').textContent = property.price;
        document.getElementById('property-size').textContent = property.size;
        document.getElementById('property-bedrooms').textContent = property.bedrooms;
        document.getElementById('property-bathrooms').textContent = property.bathrooms;
        document.getElementById('property-amenities').textContent = property.amenities.join(', ');
        document.getElementById('property-contact').textContent = property.contact;
    } catch (error) {
        console.error('Error fetching property details:', error);
        document.getElementById('result-message').textContent = 'Failed to load property details.';
        document.getElementById('result-message').classList.remove('hidden');
    }
}

function goBackToListings() {
    window.location.href = '/listings.html'; // Redirect to the listings page
}

// Populate the property details on page load
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id'); // Get property ID from the URL
    if (propertyId) {
        populatePropertyDetails(propertyId);
    } else {
        console.error('Property ID not found in URL');
    }
});