// Function to handle the transition and redirection
function redirectToMainPage() {
    // Apply the fade-out class to start the animation
    document.querySelector('.loading-screen').classList.add('fade-out');

    // Wait for the animation to finish before redirecting
    setTimeout(function() {
        window.location.href = "main.html";  // Redirect to the main portfolio page
    }, 1000);  // Time in ms to match the fade-out duration (1s)
}

// Wait for the "Enter" key press (for desktop)
document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        redirectToMainPage();
    }
});

// Wait for a tap or click (for mobile and touch devices)
document.addEventListener('click', function() {
    redirectToMainPage();
});
