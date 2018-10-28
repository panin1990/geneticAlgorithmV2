import {PositionInMap} from "./smallClasses";

export class Bot {
  public health: number = 100;
  private position: PositionInMap;

  constructor(positionInMap) {
    this.position = positionInMap;
  }

  public getPosition() {
    return this.position;
  }
}