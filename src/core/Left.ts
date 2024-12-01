import { Either } from './Either';

export class Left<L> extends Either<L, null> {
  constructor(value: L) {
    super(value, null);
  }
}
