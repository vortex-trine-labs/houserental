// Loading header and footer dynamically
document.addEventListener("DOMContentLoaded", function () {
    fetch("../assets/header.html").then(res => res.text()).then(data => {
        document.getElementById("header-container").innerHTML = data;
    });

    fetch("../assets/footer.html").then(res => res.text()).then(data => {
        document.getElementById("footer-container").innerHTML = data;
    });

    document.querySelectorAll(".tab-btn").forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
            this.classList.add("active");
            document.getElementById(this.textContent.replace(" ", "-").toLowerCase()).classList.add("active");
        });
    });

    // Fetch the logged-in user profile from the server
    fetch('/getUserProfile.php', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("username").textContent = data.username;
            document.getElementById("name").textContent = data.name;
            document.getElementById("email").textContent = data.email;
            document.getElementById("phone").textContent = data.phone;
            document.getElementById("edit-name").value = data.name;
            document.getElementById("edit-email").value = data.email;
            document.getElementById("edit-phone").value = data.phone;
        } else {
            alert("Error fetching user data.");
        }
    });
});

function editProfile() {
    // Allow user to edit profile
    document.querySelectorAll(".profile-sidebar input").forEach(input => input.disabled = false);
}

function saveProfile() {
    // Save profile changes to the server
    const updatedData = {
        name: document.getElementById("edit-name").value,
        email: document.getElementById("edit-email").value,
        phone: document.getElementById("edit-phone").value
    };

    fetch('/saveProfile.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Profile updated successfully!");
        } else {
            alert("Error saving profile.");
        }
    });
}
