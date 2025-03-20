document.addEventListener("DOMContentLoaded", function () {
    const loginMenuItem = document.querySelector('.menu li a[href="login.html"]');

    if (localStorage.getItem("loggedIn") === "true") {
        if (loginMenuItem) {
            loginMenuItem.textContent = "Schoolexamen"; // Verander de naam
            loginMenuItem.href = "schoolexamen.html"; // Verander de link
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logout-button");

    if (localStorage.getItem("loggedIn") !== "true") {
        // Niet ingelogd? Verberg de knop
        if (logoutButton) {
            logoutButton.style.display = "none";
        }
    }
});
 