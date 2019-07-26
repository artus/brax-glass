/*
  Constants
*/
const glassId = 'brax-glass-blonde';
const foamThickness = 0.2;
let fillPercentage = 0.3;

/*
  Elements
*/
const glassContainer = document.getElementById(glassId);
const glassContent = glassContainer.getElementsByClassName(`brax-glass-content`)[0];
const glassForeground = glassContainer.getElementsByClassName(`brax-glass-foreground`)[0];
const glassFoam = glassContainer.getElementsByClassName(`brax-glass-foam`)[0];

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

function getFoamThickness() {
  return foamThickness * fillPercentage;
}

function getHeightForForeground() {
  return (1 - fillPercentage) * getWidth();
}

function getHeightForContent() {
  return getWidth() * fillPercentage;
}

function getBottomForFoam() {
  return getHeightForForeground();
}

function getHeightForFoam() {
  return this.getWidth() * this.getFoamThickness();
}

function getTopForContent() {
  return this.getWidth() - this.getHeightForContent();
}

function getTopForFoam() {
  return this.getTopForContent() - this.getHeightForFoam();
}

function getBackgroundPositionForFoam() {
  return this.getTopForFoam() * -1;
}

function resizeGlass() {
  console.log("resizing");
  const width = getWidth();
  glassContainer.style.width = `${width}px`;

  glassForeground.style.height = `${getHeightForForeground()}px`;
  glassContent.style.height = `${getHeightForContent()}px`;

  glassFoam.style.top = `${getTopForFoam()}px`;
  glassFoam.style.height = `${getHeightForFoam()}px`;

  glassFoam.style.backgroundPosition = `0 ${getBackgroundPositionForFoam()}px`

  glassForeground.style.backgroundSize = `${width}px ${width}px`;
  glassContent.style.backgroundSize = `${width}px ${width}px`;
  glassFoam.style.backgroundSize = `${width}px ${width}px`;
}

function setFillPercentage(newPercentage) {
  fillPercentage = newPercentage;
  resizeGlass();
}

/*
  Start
*/
resizeGlass();

const glassSlider = document.getElementById("glass-slider");
glassSlider.oninput = function() {
  setFillPercentage(this.value);
}