import PixelValue from "./pixel.value";
import Ratio from "./ratio";


export default class CanvasState {
  constructor(
    public readonly height: PixelValue,
    public readonly width: PixelValue,
    private ratio: Ratio
  ) { }

  getRatio(): Ratio {
    return this.ratio;
  }

  setRatio(ratio: Ratio): void {
    this.ratio = ratio;
  }
}
