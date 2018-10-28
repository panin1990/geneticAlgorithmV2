import {Map} from "./map";
import {Bot} from "./Bot";
import {Type} from "./Type";

import * as Rx from "rxjs/Observable";

console.log(Rx);

let map = new Map(<HTMLCanvasElement> document.getElementById('canvasMap'), 1500, 380, 20);

let poisonType = new Type('poison', '#222222', (bot: Bot)=>{bot.health = 0;});

let types: Array<Type> = [];
types.push(poisonType);

let vasyaAlone = new Bot;

poisonType.action(vasyaAlone);
console.log(vasyaAlone);


console.log(map);