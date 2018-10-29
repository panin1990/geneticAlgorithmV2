import {Map} from "./map";
import {Bot} from "./Bot";
import {Type, TypesCollection} from "./Type";
import {PositionInMap} from "./smallClasses";


let poisonType = new Type('poison', '#222222', (bot: Bot)=>{bot.health = 0;});
let emptyType = new Type('empty', '#ffffff', (() => {}));
let botType = new Type('bot', '#990034', ((bot: Bot)=> {bot.goBack()}));

let typesCollection = new TypesCollection();
typesCollection.push(poisonType);
typesCollection.push(emptyType, true);
typesCollection.push(botType);

let firstTestBot = new Bot(new PositionInMap(0,0), botType);

let map = new Map(<HTMLCanvasElement> document.getElementById('canvasMap'), 1500, 400, 20, typesCollection);
map.addBotInMap(firstTestBot);
map.renderMap();
console.log(map);

firstTestBot.go(new PositionInMap(10,15));