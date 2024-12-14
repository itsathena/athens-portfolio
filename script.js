// Wait for the "Enter" key press
document.addEventListener('keydown', function(event) {
    // Check if the key pressed is the "Enter" key
    if (event.key === "Enter") {
        // Apply the fade-out class to start the animation
        document.querySelector('.loading-screen').classList.add('fade-out');

        // Wait for the animation to finish before redirecting
        setTimeout(function() {
            window.location.href = "main.html";  // Redirect to the main portfolio page
        }, 1000);  // Time in ms to match the fade-out duration (1s)
    }
});
