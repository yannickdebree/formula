import { Either, Right } from '../core';
import { Calculus } from './Calculus';
import { ImpossibleOperationError } from './errors';
import { Formula } from './Formula';

export class CalculusFactory {
  static fromFormula(
    formula: Formula
  ): Either<Calculus, ImpossibleOperationError> {
    return new Right(new ImpossibleOperationError());
  }
}
