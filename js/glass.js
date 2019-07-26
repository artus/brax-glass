class Glass {

  constructor(glassId, fillPercentage, foamThickness) {
    this.glassId = glassId;
    this.fillPercentage = fillPercentage;
    this.foamThickness = foamThickness;

    this.glassContainer = document.getElementById(glassId);
    this.glassContent = this.glassContainer.getElementsByClassName(`brax-glass-content`)[0];
    this.glassForeground = this.glassContainer.getElementsByClassName(`brax-glass-foreground`)[0];
    this.glassFoam = this.glassContainer.getElementsByClassName(`brax-glass-foam`)[0];

    window.addEventListener('resize', function() { this.render(); }.bind(this));

    this.render();
  }

  getWidth() {
    return this.glassContainer.clientHeight;
  }

  getFoamThickness() {
    return this.foamThickness * this.fillPercentage;
  }

  getHeightForForeground() {
    return Math.ceil((1 - this.fillPercentage) * this.getWidth());
  }

  getHeightForContent() {
    return Math.ceil(this.getWidth() * this.fillPercentage);
  }

  getBottomForFoam() {
    return Math.ceil(this.getHeightForForeground());
  }

  getHeightForFoam() {
    return Math.ceil(this.getWidth() * this.getFoamThickness());
  }

  getTopForContent() {
    return Math.ceil(this.getWidth() - this.getHeightForContent());
  }

  getTopForFoam() {
    return Math.ceil(this.getTopForContent() - this.getHeightForFoam() + 1);
  }

  getBackgroundPositionForFoam() {
    return Math.ceil(this.getTopForFoam() * -1);
  }

  render() {
    console.log("resizing");
    const width = this.getWidth();
    this.glassContainer.style.width = `${width}px`;

    this.glassForeground.style.height = `${this.getHeightForForeground()}px`;
    this.glassContent.style.height = `${this.getHeightForContent()}px`;

    this.glassFoam.style.top = `${this.getTopForFoam()}px`;
    this.glassFoam.style.height = `${this.getHeightForFoam()}px`;

    this.glassFoam.style.backgroundPosition = `0 ${this.getBackgroundPositionForFoam()}px`

    this.glassForeground.style.backgroundSize = `${width}px ${width}px`;
    this.glassContent.style.backgroundSize = `${width}px ${width}px`;
    this.glassFoam.style.backgroundSize = `${width}px ${width}px`;
  }

  setFillPercentage(newPercentage) {
    this.fillPercentage = newPercentage;
    this.render();
  }
}

const glass = new Glass('brax-glass-blonde', 0.8, 0.3);

const glassSlider = document.getElementById("glass-slider");
glassSlider.oninput = function () {
  glass.setFillPercentage(this.value);
}