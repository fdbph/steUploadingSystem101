// Default role
let role = "teacher";

// Buttons
const teacherBtn = document.getElementById("teacherBtn");
const learnerBtn = document.getElementById("learnerBtn");

// Inputs
const label = document.getElementById("usernameLabel");
const username = document.getElementById("username");
const password = document.getElementById("password");

// Switch to Teacher
teacherBtn.addEventListener("click", () => {

    role = "teacher";

    teacherBtn.classList.add("active");
    learnerBtn.classList.remove("active");

    label.textContent = "Gmail";
    username.placeholder = "Enter your Gmail";
    username.value = "";
    password.value = "";

});

// Switch to Learner
learnerBtn.addEventListener("click", () => {

    role = "learner";

    learnerBtn.classList.add("active");
    teacherBtn.classList.remove("active");

    label.textContent = "Learner Reference Number";
    username.placeholder = "Enter your LRN";
    username.value = "";
    password.value = "";

});

// Login
document.getElementById("loginForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const response = await fetch("/api/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                role: role,
                username: username.value.trim(),
                password: password.value
            })

        });

        console.log("HTTP Status:", response.status);

        // Read response as text first
        const text = await response.text();

        console.log("Server Response:", text);

        // Convert text to JSON
        const data = JSON.parse(text);

        if (data.success) {

    if (data.role === "learner") {

        window.location.href = "learner-dashboard.html";

    } else {

        window.location.href = "dashboard.html";

    }

} else {

            alert(data.message || "Login failed.");

        }

    } catch (error) {

        console.error("Login Error:", error);

        alert("Unable to connect to the server.");

    }

});