// Function to open a window
function openWindow(windowId) {
  const window = document.getElementById(`window-${windowId}`);
  window.style.display = "block"; // Show window
  window.classList.add("open");
  window.classList.remove("close");

  // Initialize dragging for the opened window
  makeDraggable(windowId);
}

// Add close button functionality
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

  // For mouse drag events
  dragHeader.addEventListener("mousedown", (e) => {
      isMouseDown = true;
      offsetX = e.clientX - dragItem.getBoundingClientRect().left;
      offsetY = e.clientY - dragItem.getBoundingClientRect().top;

      // Change the cursor while dragging
      dragItem.style.cursor = 'move';
  });

  document.addEventListener("mousemove", (e) => {
      if (isMouseDown) {
          dragItem.style.left = e.clientX - offsetX + "px";
          dragItem.style.top = e.clientY - offsetY + "px";
      }
  });

  document.addEventListener("mouseup", () => {
      if (isMouseDown) {
          isMouseDown = false;
          dragItem.style.cursor = 'default'; // Reset cursor
      }
  });

  // For touch drag events
  dragHeader.addEventListener("touchstart", (e) => {
      isMouseDown = true;
      const touch = e.touches[0]; // Get the first touch point
      offsetX = touch.clientX - dragItem.getBoundingClientRect().left;
      offsetY = touch.clientY - dragItem.getBoundingClientRect().top;

      // Change the cursor while dragging
      dragItem.style.cursor = 'move';
  });

  document.addEventListener("touchmove", (e) => {
      if (isMouseDown) {
          const touch = e.touches[0]; // Get the first touch point
          dragItem.style.left = touch.clientX - offsetX + "px";
          dragItem.style.top = touch.clientY - offsetY + "px";
      }
  });

  document.addEventListener("touchend", () => {
      if (isMouseDown) {
          isMouseDown = false;
          dragItem.style.cursor = 'default'; // Reset cursor
      }
  });
}

// Initialize windows (About Me, Projects, etc.) on page load
document.addEventListener("DOMContentLoaded", () => {
  // Make sure to make the first opened window draggable
  makeDraggable('aboutme');
  makeDraggable('projects');
  makeDraggable('contact');
});
