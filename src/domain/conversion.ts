import CanvasState from './canvas.state';
import PixelValue from './pixel.value';
import UnitValue from './unit.value';

export function convertOffsetXToX(
  offsetX: PixelValue,
  canvasState: CanvasState
): UnitValue {
  return new UnitValue(
    (offsetX.value - canvasState.width.value / 2) /
      canvasState.getRatio().pixelsPeerUnit
  );
}

export function convertXToOffsetX(x: UnitValue, canvasState: CanvasState): PixelValue {
  return new PixelValue(
    canvasState.width.value / 2 +
      x.value * canvasState.getRatio().pixelsPeerUnit
  );
}

export function convertOffsetYToY(
  offsetY: PixelValue,
  canvasState: CanvasState
): UnitValue {
  const firstComputing = canvasState.height.value / 2 - offsetY.value;
  const pixelsPeerUnits = canvasState.getRatio().pixelsPeerUnit;
  return new UnitValue(
    firstComputing /
      (firstComputing === 0 ? pixelsPeerUnits : -1 * pixelsPeerUnits)
  );
}

export function convertYToOffsetY(y: UnitValue, canvasState: CanvasState): PixelValue {
  const firstComputing = y.value * canvasState.getRatio().pixelsPeerUnit;
  return new PixelValue(
    canvasState.height.value / 2 +
      (firstComputing === 0 ? firstComputing : -1 * firstComputing)
  );
}
