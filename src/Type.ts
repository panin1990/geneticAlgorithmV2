import {Bot} from "./Bot";

export class Type {
  constructor (typeName: string, colorInMap: string, actionToPlayer: (bot: Bot) => void) {
    this.typeName = typeName;
    this.colorInMap = colorInMap;
    this.actionToPlayer = actionToPlayer;
  }

  public typeName;
  public colorInMap;
  private actionToPlayer;

  public action(bot: Bot) {
    this.actionToPlayer(bot);
    return bot;
  }
}