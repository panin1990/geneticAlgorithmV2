import {Map} from "./Map";
import {Bot} from "./Bot";
import {Type, TypesCollection} from "./Type";
import {PositionInMap, Tools} from "./smallClasses";
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

let botsViewRange = 2;

let exampleGenome = new Genome;
exampleGenome.action = {
  bot: [0, 0, 0, 0, 0, 0, 0, 0],
  eat: [3000, 1500, 700, 600, 500, 400, 300],
  poison: [-1000, -800, 0, 0, 0, 0, 0, 0],
  empty: [-9, -8, -7, -6, -5, -4, -3, -2]
};

let secondTestBot = new Bot(new PositionInMap(5,13), botType, exampleGenome);
map.addBotInMap(secondTestBot);


map.renderMap();

//fill items map
function fillMap(map: Map, items:Array<TypesToFill>):Array<Bot> {
  let bots = [];
  for (let i = 0; i < items.length; i++) {
    for(let j = 0; j < items[i].count; j++) {
      let emptyRandomCoordinate: PositionInMap;
      while (!emptyRandomCoordinate) {
        let position = new PositionInMap(Tools.randomInt(0, map.getParams().width - 1), Tools.randomInt(0, map.getParams().height - 1));
        if (map.isEmpty(position)) {
          emptyRandomCoordinate = position;
        }
      }
      if (items[i].type !== 'bot') {
        map.addItemInMap(map.typesCollection.getType(items[i].type), emptyRandomCoordinate);
      } else {
        let bot = new Bot(emptyRandomCoordinate, botType, exampleGenome);
        map.addBotInMap(bot);
        bots.push(bot);
      }
    }
  }
  return bots;
}

let bots = fillMap(map, [{type: 'eat', count: 40},{type: 'poison', count: 30}, {type: 'bot', count: 1}]);
console.log(bots);
// bots[0].fillMapWeights(map.getAroundItems(secondTestBot.getPosition(), botsViewRange));
// bots[0].goOptimalPath();
setInterval(()=>{
  console.log(bots[0].getPosition());
  bots[0].fillMapWeights(map.getAroundItems(bots[0].getPosition(), botsViewRange));
  bots[0].goOptimalPath();
}, 1500);

// setTimeout(()=>{
//   secondTestBot.fillMapWeights(map.getAroundItems(secondTestBot.getPosition(), botsViewRange));
//   secondTestBot.goOptimalPath();
// }, 1000);


class TypesToFill {
  public type: string;
  public count: number;
}