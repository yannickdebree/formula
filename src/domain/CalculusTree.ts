export class CalculusTree {
  constructor(
    public readonly operator: string,
    public readonly parameters = new Array<number | CalculusTree>()
  ) {}
}
