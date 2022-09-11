export class Either<L, R> {
  constructor(
    public readonly left: L | null,
    public readonly right: R | null
  ) {}
}
