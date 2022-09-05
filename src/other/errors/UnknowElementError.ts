export class UnknowElementError extends Error {
  constructor(public readonly selectors: string) {
    super();
  }
}
