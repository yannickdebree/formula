import Point from './point';

export default class PointToDraw extends Point<number> {
  constructor({ offsetX, offsetY }: { offsetX: number; offsetY: number }) {
    super(offsetX, offsetY);
  }
}
