// Function to open a window
function openWindow(windowId) {
  const window = document.getElementById(`window-${windowId}`);
  window.style.display = "block"; // Show window
  window.classList.add("open");
  window.classList.remove("close");

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
  makeDraggable('aboutme');
  makeDraggable('projects');
  makeDraggable('contact');
});
