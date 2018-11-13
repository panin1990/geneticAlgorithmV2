import {PositionInMap} from "./smallClasses";
import {Subject} from "rxjs";
import {Type} from "./Type";
import {isNumeric} from "rxjs/internal/util/isNumeric";
import {Genome} from "./Genome";

export class Bot {

  private position: PositionInMap;
  private previousPosition: PositionInMap;
  private type: Type;
  private health: number = 100;
  private mapWeights: Array<Array<number>>;
  private genome: Genome;
  private memory: Array<Array<MemoryItem>> = [];
  private time: number = 0;
  private memorySize: number;

  public subject: Subject<Boolean>;

  constructor(positionInMap: PositionInMap, type: Type, genome: Genome) {
    this.position = positionInMap;
    this.type = type;
    this.genome = genome;
    this.subject = new Subject();
    this.mapWeights = [];
  }

  public fillMapWeights(itemsAround: Array<Array<Type>>) {
    let oneStepDistanceItems = [];
    for (let positionAroundX = (this.getPosition().x - 1); positionAroundX <= (this.getPosition().x + 1); positionAroundX++) {
      if (itemsAround[positionAroundX]) {
        oneStepDistanceItems[positionAroundX] = [];
        for (let positionAroundY = (this.getPosition().y - 1); positionAroundY <= (this.getPosition().y + 1); positionAroundY++) {
          if (
            itemsAround[positionAroundX][positionAroundY] &&
            !((positionAroundX === this.getPosition().x) && (positionAroundY === this.getPosition().y))
          ) {
            oneStepDistanceItems[positionAroundX][positionAroundY] = itemsAround[positionAroundX][positionAroundY];
          }
        }
      }
    }

    this.foreachItems(oneStepDistanceItems, (masterX, masterY, item)=>{
      if (!this.mapWeights[masterX]) {
        this.mapWeights[masterX] = [];
      }

      this.mapWeights[masterX][masterY] = 0;

      this.foreachItems(itemsAround, (slaveX, slaveY, slaveItem)=>{
        this.mapWeights[masterX][masterY] += (
          Math.abs(masterX - slaveX) > Math.abs(masterY - slaveY) ?
            this.genome.action[slaveItem.typeName][Math.abs(masterX - slaveX)] :
            this.genome.action[slaveItem.typeName][Math.abs(masterY - slaveY)]
        );
      });

      //memory injection
      this.foreachItems(this.memory, (memoryX, memoryY, memoryItem)=>{
        if (!itemsAround[memoryX] || !itemsAround[memoryX][memoryY]) {
          this.mapWeights[masterX][masterY] += (
            Math.abs(masterX - memoryX) > Math.abs(masterY - memoryY) ?
              this.genome.action[memoryItem.typeName][Math.abs(masterX - memoryX)] :
              this.genome.action[memoryItem.typeName][Math.abs(masterY - masterY)]
          );
        }
      });

      //fill memory
      if (!this.memory[masterX]) {
        this.memory[masterX] = [];
      }
      this.memory[masterX][masterY] = new MemoryItem(item, this.time);

    });
    return this.mapWeights;
  }

  private foreachItems(items: Array<Array<Type>>, func: (x: number, y: number, item: Type) => void) {
    for (let x = 0; x <= items.length; x++) {
      if (items[x]) {
        for (let y = 0; y <= items[x].length; y++) {
          if (items[x][y]) {
            func(x, y, items[x][y]);
          }
        }
      }
    }
  }

  public goOptimalPath() {
    let bestPath = this.findOptimalPath();
    this.move(bestPath.x, bestPath.y);
  }

  private findOptimalPath() {
    let bestPath = {weight: -999999, x: 0, y: 0};
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (this.mapWeights[this.position.x + x] && isNumeric(this.mapWeights[this.position.x + x][this.position.y + y])) {
          if (bestPath.weight < this.mapWeights[this.position.x + x][this.position.y + y]) {
            bestPath = {weight: this.mapWeights[this.position.x + x][this.position.y + y], x: x, y: y};
          }
        }
      }
    }
    return bestPath;
  }

  private go(positionInMap: PositionInMap, doEventMove: boolean = true) {
    this.previousPosition = this.position;
    this.position = positionInMap;
    if (doEventMove) {
      this.subject.next(false);
    }
  }

  public updateHealth(difference: number) {
    this.health += difference;
    if (this.health <= 0) {
      this.subject.next(true);
    }
  }

  public getPosition() {
    return this.position;
  }

  public getPreviousPosition() {
    return this.previousPosition;
  }

  public getCurrentType() {
    return this.type;
  }

  public move(xDelta: number, yDelta: number) {
    this.go(new PositionInMap(this.position.x + xDelta, this.position.y + yDelta));
  }

  public goBack() {
    this.go(this.previousPosition, false);
  }

}

export class MemoryItem extends Type {
  public memoryTimeStamp: number;

  constructor (type: Type, memoryTimeStamp: number = 0) {
    super(type.typeName,type.colorInMap, type.action);
    this.memoryTimeStamp = memoryTimeStamp;
  }
}