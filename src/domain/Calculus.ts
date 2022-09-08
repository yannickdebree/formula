export class Calculus {
  constructor(
    public readonly operator: string,
    public readonly parameters: Array<number | Calculus>
  ) {}
}
