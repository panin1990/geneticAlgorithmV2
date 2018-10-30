import {Bot} from "./Bot";

export class Type {

  private actionToPlayer;

  public typeName;
  public colorInMap;

  constructor (typeName: string, colorInMap: string, actionToPlayer: (bot: Bot) => void = (()=>{})) {
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
  private defaultType: Type;

  public push(type: Type, isDefault: boolean = false) {
    this.types.push(type);
    if (isDefault) {
      this.defaultType = type;
    }
  }

  public getDefaultType() {
    return this.defaultType;
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