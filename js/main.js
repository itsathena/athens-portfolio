// Function to open a window at a random position
let zIndexCounter = 1000;

function openWindow(windowId) {
  const window = document.getElementById(`window-${windowId}`);
  window.style.display = "block"; // Show window
  window.classList.add("open");
  window.classList.remove("close");

  setRandomPosition(window);

  // Bring the clicked window to the front
  zIndexCounter++;
  window.style.zIndex = 1000;

  // Initialize dragging for the opened window
  makeDraggable(windowId);
}

// Close window functionality
const closeBtns = document.querySelectorAll(".close-btn");
closeBtns.forEach((button) => {
  const closeWindow = (e) => {
    e.stopPropagation(); // Prevent drag or parent clicks
    const window = button.closest(".window");
    window.classList.remove("open");
    window.classList.add("close");
    setTimeout(() => (window.style.display = "none"), 300);
  };

  button.addEventListener("click", closeWindow);
  button.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    closeWindow(e);
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
    dragItem.style.cursor = 'default'; 
  });

  dragItem.addEventListener("mousedown", () => {
    zIndexCounter++;
    dragItem.style.zIndex = zIndexCounter;
  });

  dragItem.addEventListener("touchstart", () => {
    zIndexCounter++;
    dragItem.style.zIndex = zIndexCounter;
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

document.querySelectorAll('.dropdown-content a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // prevent default anchor navigation

    const windowId = link.getAttribute('data-window');
    if (windowId) {
      openWindow(windowId);
    }
  });
});

const menuBtn = document.getElementById('menu-btn');
const dropdownContent = document.getElementById('dropdown-content');

menuBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent click from bubbling up and closing immediately
  dropdownContent.classList.toggle('open');
});

// Close dropdown if clicking outside
document.addEventListener('click', () => {
  dropdownContent.classList.remove('open');
});

// Open window on dropdown link click
dropdownContent.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const windowId = link.getAttribute('data-window');
    if (windowId) {
      openWindow(windowId);
    }
    dropdownContent.classList.remove('open'); // close menu after click
  });
});


//SECRET
let typed = "";
document.addEventListener("keydown", (e) => {
  typed += e.key.toUpperCase();
  if (typed.length > 4) typed = typed.slice(-4);
  if (typed === "GAME") {
    openWindow("secret");
    startCatchGame();
  }
});

const canvas = document.getElementById("catch-game");
const ctx = canvas.getContext("2d");

let paddle = { x: 120, y: 260, width: 60, height: 10 };
let pixel = { x: Math.random() * 270, y: 0, size: 10, speed: 2 };
let score = 0;
let leftPressed = false;
let rightPressed = false;
let gameInterval;

// Listen for key press for paddle movement
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") leftPressed = true;
  else if (e.key === "ArrowRight") rightPressed = true;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") leftPressed = false;
  else if (e.key === "ArrowRight") rightPressed = false;
});

function drawPaddle() {
  ctx.fillStyle = "#0f0";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawPixel() {
  ctx.fillStyle = "#f07d8c";
  ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
}

function resetPixel() {
  pixel.x = Math.random() * (canvas.width - pixel.size);
  pixel.y = 0;
  pixel.speed = 2 + score * 0.2; // speed up slightly as score increases
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move paddle
  if (leftPressed && paddle.x > 0) paddle.x -= 5;
  if (rightPressed && paddle.x + paddle.width < canvas.width) paddle.x += 5;

  // Move pixel down
  pixel.y += pixel.speed;

  // Check for catch
  if (
    pixel.y + pixel.size >= paddle.y &&
    pixel.x + pixel.size > paddle.x &&
    pixel.x < paddle.x + paddle.width
  ) {
    score++;
    document.getElementById("catch-score").innerText = score;
    resetPixel();
  }

  // Check if pixel hits bottom without being caught
  if (pixel.y > canvas.height) {
    // Reset score and pixel
    score = 0;
    document.getElementById("catch-score").innerText = score;
    resetPixel();
  }

  drawPixel();
  drawPaddle();
}

function startCatchGame() {
  if (gameInterval) clearInterval(gameInterval);
  score = 0;
  resetPixel();
  gameInterval = setInterval(update, 20);
}

// Clear the game when window is closed
document.querySelector("#window-secret .close-btn").addEventListener("click", () => {
  if (gameInterval) clearInterval(gameInterval);
});

//SHORTCUTS
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "p") {
    e.preventDefault();
    openWindow("projects");
  } else if (e.ctrlKey && e.key.toLowerCase() === "f") {
    e.preventDefault();
    openWindow("files");
  } else if (e.ctrlKey && e.key.toLowerCase() === "m") {
    e.preventDefault();
    openWindow("moviebot");
  }
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
