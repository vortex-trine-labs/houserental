// Load Header content dynamically
fetch("./pages/components/header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-container").innerHTML = data;
    })
    .catch(error => console.error("Error loading header:", error));

document.addEventListener("DOMContentLoaded", () => {
    // Initialize the map when the document is ready
    initMap();
});

// Function to initialize Leaflet map
function initMap() {
    let map = L.map("map").setView([20.5937, 78.9629], 5);  // India as the default location

    // Add the OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    window.propertyMap = map;  // Store the map globally to be accessed later
}

// Function to update the map with property markers
function updateMap(properties) {
    let map = window.propertyMap;

    // Clear all existing markers on the map
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Add new markers for each property
    properties.forEach(property => {
        if (property.latitude && property.longitude) {
            L.marker([property.latitude, property.longitude])
                .addTo(map)
                .bindPopup(`<b>${property.title}</b><br>📍 ${property.location}<br>💰 ₹${property.price}`);
        }
    });

    // Zoom to fit markers if properties exist
    if (properties.length > 0) {
        let bounds = properties.map(p => [p.latitude, p.longitude]);
        map.fitBounds(bounds, { padding: [50, 50] });
    }
}

// Function to display properties in the results section
function displayResults(properties) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";  // Clear any previous results

    // If no properties are found, display a message
    if (properties.length === 0) {
        resultsContainer.innerHTML = "<p>No properties found. Try adjusting your filters.</p>";
        return;
    }

    // Iterate over properties and create a card for each one
    properties.forEach(property => {
        const propertyCard = document.createElement("div");
        propertyCard.classList.add("property-card");

        propertyCard.innerHTML = `
            <img src="${property.image}" alt="${property.title}">
            <div class="property-info">
                <h3>${property.title}</h3>
                <p>📍 ${property.location}</p>
                <p>🏠 ${property.propertyType} | 🛏️ ${property.bhk}</p>
                <p class="property-price">💰 ₹${property.price}</p>
            </div>
        `;

        resultsContainer.appendChild(propertyCard);
    });

    // Update the map with the new properties
    updateMap(properties);
}

// Function to update the price range display
function updatePrice() {
    const minPrice = document.getElementById("minPrice").value;
    const maxPrice = document.getElementById("maxPrice").value;

    // Update the price range display
    document.getElementById("priceRange").innerText = `₹${minPrice} - ₹${maxPrice}`;
}

// Modify the submitSearch function to include price range values
function submitSearch(event) {
    event.preventDefault();  // Prevent page reload

    const location = document.getElementById("location").value;
    const propertyType = document.getElementById("propertyType").value;
    const bhk = document.getElementById("bhk").value;
    const minPrice = document.getElementById("minPrice").value;
    const maxPrice = document.getElementById("maxPrice").value;

    // Construct the query string based on the form data
    const queryParams = new URLSearchParams({
        location,
        propertyType,
        bhk,
        minPrice,
        maxPrice
    }).toString();

    // Make the API call to fetch filtered properties
    fetch(`http://localhost:5000/api/search?${queryParams}`)
        .then(response => response.json())  // Parse JSON response
        .then(data => {
            if (Array.isArray(data)) {
                displayResults(data);  // Display the results if the data is an array
            } else {
                console.error("Unexpected data format:", data);
            }
        })
        .catch(error => {
            console.error("Error fetching properties:", error);
            alert("An error occurred while fetching properties.");
        });
}

// Call updatePrice initially to display the default price range
document.addEventListener("DOMContentLoaded", () => {
    updatePrice();  // Set the initial price range when the page loads
});


fetch("./pages/components/footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer-container").innerHTML = data;
    })
    .catch(error => console.error("Error loading footer:", error));