/*
  Constants
*/
const glassId = 'brax-glass-blonde';
let fillPercentage = 0.5;

/*
  Elements
*/
const glassContainer = document.getElementById(glassId);
const glassContent = glassContainer.getElementsByClassName(`brax-glass-content`)[0];

/*
  Event handlers
*/
window.addEventListener('resize', resizeGlass);

/*
  Functions
*/
function getWidth() {
  return glassContainer.clientHeight;
}

function getHeightForContent() {
  return getWidth() * fillPercentage;
}

function resizeGlass() {
  console.log("resizing");
  const width = getWidth();
  glassContainer.style.width = `${width}px`;
  glassContent.style.backgroundSize = `${width}px ${width}px`;
  glassContent.style.height = `${getHeightForContent()}px`;
}

function setFillPercentage(newPercentage) {
  fillPercentage = newPercentage;
  resizeGlass();
}

/*
  Start
*/
resizeGlass();