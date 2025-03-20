const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

// Controleer of de gebruiker al is ingelogd
if (localStorage.getItem("loggedIn") === "true") {
    window.location.href = "schoolexamen.html";
}

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "Nizarb123" && password === "Nizarb123") {
        localStorage.setItem("loggedIn", "true"); // Onthoud inlogstatus
        alert("Je bent succesvol ingelogd.");
        window.location.href = "schoolexamen.html";
    } else {
        loginErrorMsg.style.opacity = 1;
    }
});

 