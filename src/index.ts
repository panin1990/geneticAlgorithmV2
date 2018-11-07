import {Map} from "./map";
import {Bot} from "./Bot";
import {Type, TypesCollection} from "./Type";
import {PositionInMap} from "./smallClasses";
import {Genome} from "./Genome";


let poisonType = new Type('poison', '#2bb200', (bot: Bot)=>{bot.updateHealth(-100);});
let eatType = new Type('eat', '#2525b2', (bot: Bot)=>{bot.updateHealth(10);});
let emptyType = new Type('empty', '#3e3e3e');
let botType = new Type('bot', '#963b8d', ((bot: Bot)=> {bot.goBack()}));

let typesCollection = new TypesCollection();
typesCollection.push(poisonType);
typesCollection.push(eatType);
typesCollection.push(emptyType, true);
typesCollection.push(botType);

let map = new Map(<HTMLCanvasElement> document.getElementById('canvasMap'), 1500, 400, 20, typesCollection);

map.addItemInMap(poisonType, new PositionInMap(10,15));
map.addItemInMap(eatType, new PositionInMap(6,15));

let exampleGenome = new Genome;
exampleGenome.action = {
  bot: [0, 0, 0, 0, 0, 0, 0, 0],
  eat: [900, 800, 700, 600, 500, 400, 300],
  poison: [-100, 0, 0, 0, 0, 0, 0, 0],
  empty: [-9, -8, -7, -6, -5, -4, -3, -2]
};
console.log(exampleGenome);


let firstTestBot = new Bot(new PositionInMap(0,0), botType, exampleGenome);
let secondTestBot = new Bot(new PositionInMap(5,13), botType, exampleGenome);
map.addBotInMap(firstTestBot);
map.addBotInMap(secondTestBot);


map.renderMap();

setTimeout(()=>{
  console.log(secondTestBot.getPosition());
  console.log(secondTestBot.fillMapWeights(map.getAroundItems(secondTestBot.getPosition(), 2)));
  // secondTestBot.fillMapWeights(map.getAroundItems(secondTestBot.getPosition(), secondTestBot.viewingRange));
  secondTestBot.goOptimalPath();
}, 1000);
