import {Bot} from "./Bot";

export class Type {

  private actionToPlayer;

  public typeName;
  public colorInMap;

  constructor (typeName: string, colorInMap: string, actionToPlayer: (bot: Bot) => void) {
    this.typeName = typeName;
    this.colorInMap = colorInMap;
    this.actionToPlayer = actionToPlayer;
  }

  public action(bot: Bot) {
    this.actionToPlayer(bot);
    return bot;
  }
}

export class TypesCollection {
  private types: Array<Type> = [];

  public push(type: Type) {
    this.types.push(type);
  }

  public getType(typeName: string) {
    for (let i = 0; i < this.types.length; i++) {
      if (this.types[i].typeName === typeName) {
        return this.types[i];
      }
    }
    throw new Error('we do not have a type '+ typeName);
  }
}