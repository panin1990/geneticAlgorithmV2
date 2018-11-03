import {Map} from "./map";
import {Bot} from "./Bot";
import {Type, TypesCollection} from "./Type";
import {PositionInMap} from "./smallClasses";


let poisonType = new Type('poison', '#2bb200', (bot: Bot)=>{bot.updateHealth(-100);});
let eatType = new Type('eat', '#2525b2', (bot: Bot)=>{bot.updateHealth(10);});
let emptyType = new Type('empty', '#3e3e3e');
let botType = new Type('bot', '#963b8d', ((bot: Bot)=> {bot.goBack()}));

let typesCollection = new TypesCollection();
typesCollection.push(poisonType);
typesCollection.push(eatType);
typesCollection.push(emptyType, true);
typesCollection.push(botType);

let firstTestBot = new Bot(new PositionInMap(0,0), botType);
let secondTestBot = new Bot(new PositionInMap(5,13), botType);

let map = new Map(<HTMLCanvasElement> document.getElementById('canvasMap'), 1500, 400, 20, typesCollection);
map.addBotInMap(firstTestBot);
map.addItemInMap(poisonType, new PositionInMap(10,15));
map.addItemInMap(eatType, new PositionInMap(5,14));
map.addBotInMap(secondTestBot);
map.renderMap();

setTimeout(()=>{
  secondTestBot.fillMapWeights(map.getAroundItems(secondTestBot.getPosition(), secondTestBot.viewingRange));
  secondTestBot.goOptimalPath();
}, 1000);
