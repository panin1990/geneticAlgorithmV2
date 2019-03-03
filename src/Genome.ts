import {Tools} from "./smallClasses";
export class Genome {
  public action: GenomeAction;
}

export class GenomeAction {
  [type: string]: Array<number>;
}

export class GeneticAlgorithm {
  parents: Array<Genome>;

  constructor(genomes?: Array<Genome>) {
    if (genomes) {
      this.parents = genomes;
    }
    console.log(Tools.randomBool());
  }

}