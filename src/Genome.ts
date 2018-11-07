export class Genome {
  public action: GenomeAction;
}

export class GenomeAction {
  [type: string]: Array<number>;
}