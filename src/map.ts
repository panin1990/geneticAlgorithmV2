import {Bot} from "./Bot";
import {Type, TypesCollection} from "./Type";

export class Map {

  constructor(canvasElement: HTMLCanvasElement, width: number, height: number, gridStep: number, types: TypesCollection) {
    if ((width % gridStep !== 0) || (height % gridStep !== 0)) {
      throw new Error('width and height must division by gridStep without remainder')
    }
    this.canvasElement = canvasElement;
    this.canvasElement.height = height;
    this.canvasElement.width = width;
    this.gridStep = gridStep;
    this.canvasContext = canvasElement.getContext('2d');
    this.typesCollection = types;
    this.fillGrid();
    this.fillEmptyItems();
  }

  private canvasElement: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;
  private gridStep: number;
  private items: Array<Array<Type>> = [];
  private typesCollection: TypesCollection;

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

  private fillEmptyItems() {
    for (let i = this.canvasElement.width; i >= 0; i -= this.gridStep) {
      this.items[i / this.gridStep] = [];
      for (let j = this.canvasElement.height; j >= 0; j -= this.gridStep) {
        this.items[i / this.gridStep][j / this.gridStep] = this.typesCollection.getType('empty');
      }
    }
  }

  addBotInMap(bot: Bot) {

  }
}
