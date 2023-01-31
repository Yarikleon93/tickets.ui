export class Slider {
  public currentSlide = 0;
  public animationInterval = 7000;
  public intervalId: number;

  public initInterval(len: number): void {
    clearInterval(this.intervalId);
    this.intervalId = window.setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % len;
    }, this.animationInterval);
  }
}
