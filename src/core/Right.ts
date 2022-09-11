import { Either } from './Either';

export class Right<R> extends Either<null, R> {
  constructor(value: R) {
    super(null, value);
  }
}
