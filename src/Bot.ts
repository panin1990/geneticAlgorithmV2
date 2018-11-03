import {PositionInMap} from "./smallClasses";
import {Subject} from "rxjs";
import {Type} from "./Type";
import {isNumeric} from "rxjs/internal/util/isNumeric";

export class Bot {

  private position: PositionInMap;
  private previousPosition: PositionInMap;
  private type: Type;
  private health: number = 100;
  private mapWeights: Array<Array<number>>;
  public viewingRange: number = 1;
  public subject: Subject<Boolean>;

  constructor(positionInMap: PositionInMap, type: Type) {
    this.position = positionInMap;
    this.type = type;
    this.subject = new Subject();
    this.mapWeights = [];
  }

  public fillMapWeights(itemsAround: Array<Array<PositionInMap>>) {
    console.log(itemsAround);
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