export class Map {

  constructor(canvasElement: HTMLCanvasElement, width: number, height: number, gridStep: number) {
    if ((width % gridStep !== 0) || (height % gridStep !== 0)) {
      throw new Error('width and height must division by gridStep without remainder')
    }
    this.canvasElement = canvasElement;
    this.canvasElement.height = height;
    this.canvasElement.width = width;
    this.gridStep = gridStep;
    this.canvasContext = canvasElement.getContext('2d');
    this.fillGrid();
  }

  private canvasElement: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;
  private gridStep: number;

  private fillGrid() {
    for (let i = this.canvasElement.width; i >= 0; i -= this.gridStep) {
      this.canvasContext.beginPath();
      this.canvasContext.strokeStyle = '#808080';
      this.canvasContext.moveTo(i, 0);
      this.canvasContext.lineTo(i, this.canvasElement.height);
      this.canvasContext.stroke();
      this.canvasContext.closePath();
    }
    for (let i = this.canvasElement.height; i >= 0; i -= this.gridStep) {
      this.canvasContext.beginPath();
      this.canvasContext.strokeStyle = '#808080';
      this.canvasContext.moveTo(0, i);
      this.canvasContext.lineTo(this.canvasElement.width, i);
      this.canvasContext.stroke();
      this.canvasContext.closePath();
    }
  }
}
