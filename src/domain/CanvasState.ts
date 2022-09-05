import { PixelValue, Ratio } from '.';

export class CanvasState {
  constructor(
    public readonly height: PixelValue,
    public readonly width: PixelValue,
    private ratio: Ratio
  ) {}

  getRatio() {
    return this.ratio;
  }

  setRatio(ratio: Ratio) {
    this.ratio = ratio;
  }
}
