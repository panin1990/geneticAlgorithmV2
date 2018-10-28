import {Map} from "./map";
import {Bot} from "./Bot";
import {Type, TypesCollection} from "./Type";

import * as Rx from "rxjs/Observable";
import {PositionInMap} from "./smallClasses";

console.log(Rx);



let poisonType = new Type('poison', '#222222', (bot: Bot)=>{bot.health = 0;});
let emptyType = new Type('empty', '#ffffff', ((bot: Bot) => {}));

let typesCollection = new TypesCollection();
typesCollection.push(poisonType);
typesCollection.push(emptyType);

let vasyaAlone = new Bot(new PositionInMap(1,1));

poisonType.action(vasyaAlone);
console.log(vasyaAlone);

let map = new Map(<HTMLCanvasElement> document.getElementById('canvasMap'), 1500, 380, 20, typesCollection);
console.log(map);