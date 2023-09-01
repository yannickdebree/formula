import CanvasState from './canvas.state';
import PixelValue from './pixel.value';

export function computeMiddleOfUnitsOnAxe(
  axeSize: PixelValue,
  canvasState: CanvasState
): number {
  return Math.ceil(
    Math.ceil(axeSize.value / canvasState.getRatio().pixelsPeerUnit) / 2
  );
}
