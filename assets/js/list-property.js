// list-property.js (Frontend)
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('propertyForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Gather form data
        const formData = new FormData(form);
        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            type: formData.get('type'),
            location: formData.get('location'),
            price: formData.get('price'),
            bedrooms: formData.get('bedrooms'),
            bathrooms: formData.get('bathrooms'),
            area: formData.get('area'),
            available: formData.get('available'),
            images: formData.get('images')
        };

        try {
            // Send data to the backend
            const response = await fetch('http://localhost:5000/api/properties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                successMessage.style.display = 'block';
                form.reset(); // Clear the form
            } else {
                console.error('Failed to submit property');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
    function loadComponent(id, file) {
        fetch(file)
            .then(response => response.text())
            .then(data => document.getElementById(id).innerHTML = data);
    }

    loadComponent("header-container", "header.html");
    loadComponent("footer-placeholder", "footer.html");

