import {PositionInMap} from "./smallClasses";
import {Subject} from "rxjs";
import {Type} from "./Type";

export class Bot {

  private position: PositionInMap;
  private previousPosition: PositionInMap;
  private type: Type;
  private health: number = 100;
  public subject: Subject<Boolean>;

  constructor(positionInMap: PositionInMap, type: Type) {
    this.position = positionInMap;
    this.type = type;
    this.subject = new Subject();
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

  public go(positionInMap: PositionInMap, doEventMove: boolean = true) {
    this.previousPosition = this.position;
    this.position = positionInMap;
    if (doEventMove) {
      this.subject.next(false);
    }
  }

  public goBack() {
    this.go(this.previousPosition, false);
  }

}