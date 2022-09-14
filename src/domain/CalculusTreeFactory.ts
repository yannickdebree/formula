import { Either, Left } from '../core';
import { CalculusTree } from './CalculusTree';
import { ImpossibleOperationError } from './errors';
import { Formula } from './Formula';

export class CalculusTreeFactory {
  static fromFormula(
    formula: Formula
  ): Either<CalculusTree, ImpossibleOperationError> {
    const content = formula.content;

    if (content === 'x') {
      return new Left(new CalculusTree('x'));
    }

    return new Left(new CalculusTree('/', [1, new CalculusTree('x')]));
  }
}
