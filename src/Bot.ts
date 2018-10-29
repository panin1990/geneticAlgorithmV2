import {PositionInMap} from "./smallClasses";
import {BehaviorSubject} from "rxjs";
import {Type} from "./Type";

export class Bot {

  private position: PositionInMap;
  private previousPosition: PositionInMap;
  private type: Type;

  public health: number = 100;
  public movieBehaviorSubject: BehaviorSubject<PositionInMap>;

  constructor(positionInMap, type: Type) {
    this.position = positionInMap;
    this.type = type;
    this.movieBehaviorSubject = new BehaviorSubject(positionInMap);
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

  public go(positionInMap: PositionInMap) {
    this.previousPosition = this.position;
    this.position = positionInMap;
    this.movieBehaviorSubject.next(this.position);
  }

  public goBack() {
    this.go(this.previousPosition);
  }

}