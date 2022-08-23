import { Point } from '../domain';

export class PointToDraw extends Point<number> {
  constructor({ offsetX, offsetY }: { offsetX: number; offsetY: number }) {
    super(offsetX, offsetY);
  }
}
