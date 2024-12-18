// Function to open a window at a random position
function openWindow(windowId) {
  const window = document.getElementById(`window-${windowId}`);
  window.style.display = "block"; // Show window
  window.classList.add("open");
  window.classList.remove("close");

  // Set a random position for the window
  setRandomPosition(window);

  // Bring the clicked window to the front
  window.style.zIndex = 1000;

  // Initialize dragging for the opened window
  makeDraggable(windowId);
}

// Close window functionality
const closeBtns = document.querySelectorAll(".close-btn");
closeBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const window = button.closest(".window");
    window.classList.remove("open");
    window.classList.add("close");
    setTimeout(() => (window.style.display = "none"), 300); // Hide after animation
  });
});

// Function to set a random position for a window
function setRandomPosition(window) {
  const windowWidth = window.offsetWidth;
  const windowHeight = window.offsetHeight;

  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  // Ensure window stays within the screen bounds
  const randomX = Math.floor(Math.random() * (screenWidth - windowWidth));
  const randomY = Math.floor(Math.random() * (screenHeight - windowHeight));

  window.style.left = `${randomX}px`;
  window.style.top = `${randomY}px`;
}

// Function to make a window draggable
function makeDraggable(windowId) {
  const dragItem = document.getElementById(`window-${windowId}`);
  const dragHeader = document.getElementById(`${windowId}-header`);

  let isMouseDown = false;
  let offsetX = 0, offsetY = 0;

  // For desktop: Mouse drag events
  dragHeader.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    offsetX = e.clientX - dragItem.getBoundingClientRect().left;
    offsetY = e.clientY - dragItem.getBoundingClientRect().top;
    dragItem.style.cursor = 'move';
  });

  document.addEventListener("mousemove", (e) => {
    if (isMouseDown) {
      dragItem.style.left = e.clientX - offsetX + "px";
      dragItem.style.top = e.clientY - offsetY + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    isMouseDown = false;
    dragItem.style.cursor = 'default'; // Reset cursor when dragging stops
  });

  // For mobile: Touch drag events
  dragHeader.addEventListener("touchstart", (e) => {
    isMouseDown = true;
    const touch = e.touches[0]; // Get the first touch point
    offsetX = touch.clientX - dragItem.getBoundingClientRect().left;
    offsetY = touch.clientY - dragItem.getBoundingClientRect().top;
    e.preventDefault(); // Prevent page scrolling during drag
  });

  document.addEventListener("touchmove", (e) => {
    if (isMouseDown) {
      const touch = e.touches[0]; // Get the first touch point
      dragItem.style.left = touch.clientX - offsetX + "px";
      dragItem.style.top = touch.clientY - offsetY + "px";
    }
  });

  document.addEventListener("touchend", () => {
    isMouseDown = false;
  });
}

// Initialize on page load (for multiple windows)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".window").forEach(window => {
    window.style.display = "none";  // Hide all windows initially
  });
});


// Function to update the real-time clock
function updateTime() {
  const currentTime = new Date();
  const hours = String(currentTime.getHours()).padStart(2, '0');
  const minutes = String(currentTime.getMinutes()).padStart(2, '0');
  const seconds = String(currentTime.getSeconds()).padStart(2, '0');

  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById("current-time").innerText = timeString;
}

// Update the time every second
setInterval(updateTime, 1000);

// Initialize the clock when the page loads
updateTime();
