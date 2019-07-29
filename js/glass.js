class Glass {

  constructor(settings) {

    let {
      glassId,
      fillPercentage,
      foamThickness
    } = settings;

    this.glassId = glassId;
    this.fillPercentage = fillPercentage;
    this.foamThickness = foamThickness;

    this.glassContainer = document.getElementById(glassId);
    this.glassContainer.classList.add('brax-glass-container');

    this.createChild('glassForeground', 'brax-glass-foreground');
    this.createChild('glassBorder', 'brax-glass-border');
    this.createChild('glassFoam', 'brax-glass-foam');
    this.createChild('glassContent', 'brax-glass-content');

    window.addEventListener('resize', function () { this.render(); }.bind(this));

    this.render();
  }

  createChild(id, className) {
    const newChild = document.createElement('div');
    newChild.classList.add(className);
    this.glassContainer.appendChild(newChild);
    this[id] = newChild;
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

class TimedGlass {

  constructor(settings) {

    let {
      max,
      min,
      start,
      end } = settings;

    this.max = max || 1;
    this.min = min || 0;
    this.start = new Date(start).getTime();
    this.end = new Date(end).getTime();

    if (this.start >= this.end) throw new Error("Starting time can not be equal or after ending time.");
    if (this.max <= this.min) throw new Error("Max can not be less than min.");

    this.glass = new Glass(settings);

    this.calculateFillPercentage(this.start, this.end);
    setInterval(() => {
      this.calculateFillPercentage(this.start, this.end);
    }, 1000);
  }

  calculateFillPercentage(start, end) {
    const currentTime = new Date().getTime() - start;
    const totalTime = end - start;
    let calculatedPercentage = currentTime >= totalTime ? 0 : 1 - (currentTime / totalTime);
    this.glass.setFillPercentage(this.getFinalFillPercentage(calculatedPercentage));
  }

  getFinalFillPercentage(fillPercentage) {
    console.log(fillPercentage, this.min, this.max);
    if (fillPercentage > this.max) return this.max;
    if (fillPercentage < this.min) return this.min;
    return fillPercentage;
  }

}