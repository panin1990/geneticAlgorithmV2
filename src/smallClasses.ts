
export class PositionInMap {
  constructor (x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public x: number;
  public y: number;
}

export class Tools {
  static randomBool():void {
    return Math.random() >= 0.5
  }

  static randomInt(start: number, finish: number) {
    return Math.floor(Math.random() * (finish + 1 - start)) + start;
  }
}