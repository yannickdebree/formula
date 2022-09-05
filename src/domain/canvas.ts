import { CanvasState } from './CanvasState';
import { PixelValue } from './PixelValue';

export function computeMiddleOfUnitsOnAxe(
  axeSize: PixelValue,
  canvasState: CanvasState
) {
  return Math.ceil(
    Math.ceil(axeSize.value / canvasState.getRatio().pixelsPeerUnit) / 2
  );
}
