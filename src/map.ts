import {Bot} from "./Bot";
import {Type, TypesCollection} from "./Type";
import {PositionInMap} from "./smallClasses";

export class Map {

  private canvasElement: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;
  private gridStep: number;
  private items: Array<Array<Type>> = [];
  private typesCollection: TypesCollection;
  private gridColor: string = '#808080';

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

  private fillGrid() {
    for (let i = this.canvasElement.width; i >= 0; i -= this.gridStep) {
      this.canvasContext.beginPath();
      this.canvasContext.strokeStyle = this.gridColor;
      this.canvasContext.moveTo(i, 0);
      this.canvasContext.lineTo(i, this.canvasElement.height);
      this.canvasContext.stroke();
      this.canvasContext.closePath();
    }
    for (let i = this.canvasElement.height; i >= 0; i -= this.gridStep) {
      this.canvasContext.beginPath();
      this.canvasContext.strokeStyle = this.gridColor;
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
        this.items[i / this.gridStep][j / this.gridStep] = this.typesCollection.getDefaultType();
      }
    }
  }

  public renderMap() {

    for (let x = 0; x < this.items.length; x++) {
      for (let y = 0; y < this.items[x].length; y++) {
        this.canvasContext.beginPath();
        this.canvasContext.fillStyle = this.typesCollection.getType(this.items[x][y].typeName).colorInMap;
        this.canvasContext.fillRect(x * this.gridStep, y * this.gridStep, this.gridStep, this.gridStep);
        this.canvasContext.stroke();
      }
    }
    this.fillGrid();
  }

  public addBotInMap(bot: Bot) {
    this.addItemInMap(bot.getCurrentType(), bot.getPosition());
    bot.subject.subscribe((unsubscribe: Boolean)=>{
      if (unsubscribe) {
        bot.subject.unsubscribe();
      } else {
        let newPosition: PositionInMap = bot.getPosition();
        this.items[bot.getPosition().x][bot.getPosition().y].action(bot);

        if (newPosition !== bot.getPreviousPosition()) {
          this.moveItem(bot.getPreviousPosition(), bot.getPosition());
        }
      }
    });
  }

  public addItemInMap(type: Type, positionInMap: PositionInMap) {
    this.items[positionInMap.x][positionInMap.y] = type;
  }

  private moveItem(oldPositionInMap: PositionInMap, newPositionInMap: PositionInMap) {
    this.clearCanvas();
    this.items[newPositionInMap.x][newPositionInMap.y] = this.items[oldPositionInMap.x][oldPositionInMap.y];
    this.items[oldPositionInMap.x][oldPositionInMap.y] = this.typesCollection.getDefaultType();
    this.renderMap();

  }

  private clearCanvas() {
    this.canvasContext.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }
}
