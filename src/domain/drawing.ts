import { computeMiddleOfUnitsOnAxe } from './canvas';
import { CanvasState } from './CanvasState';
import { convertXToOffsetX, convertYToOffsetY } from './conversion';
import { Formula } from './Formula';
import { getPointsToDrawFromFormulas } from './formulas';
import { UnitValue } from './UnitValue';
import { UnitValuePoint } from './UnitValuePoint';

export function drawDefaultMark(
  canvasState: CanvasState,
  center: UnitValuePoint,
  context: CanvasRenderingContext2D
) {
  const canvasWidth = canvasState.width;
  const canvasHeight = canvasState.height;
  const isMinXOutsideCanvas = center.x.value - canvasWidth.value / 2 < 0;
  const isMinYOutsideCanvas = center.y.value - canvasHeight.value / 2 < 0;
  const isMaXYOutsideCanvas = center.x.value + canvasWidth.value / 2 > 0;
  const isMaxYOutsideCanvas = center.y.value + canvasHeight.value / 2 > 0;

  if (isMinXOutsideCanvas && isMaXYOutsideCanvas) {
    context.beginPath();
    context.strokeStyle = 'red';
    context.lineWidth = 1;
    const xInUnits =
      center.x.value >= 0 ? center.x : new UnitValue(-center.x.value);
    const xInPixels = convertXToOffsetX(xInUnits, canvasState);
    context.moveTo(xInPixels.value, 0);
    context.lineTo(xInPixels.value, canvasHeight.value);
    context.stroke();
  }

  if (isMinYOutsideCanvas && isMaxYOutsideCanvas) {
    context.beginPath();
    context.strokeStyle = 'grey';
    context.lineWidth = 1;
    const yInUnits =
      center.y.value >= 0 ? center.y : new UnitValue(-center.y.value);
    const yInPixels = convertYToOffsetY(yInUnits, canvasState);
    context.moveTo(0, yInPixels.value);
    context.lineTo(canvasWidth.value, yInPixels.value);
    context.stroke();
  }

  const middleOfUnitsOnXAxe = computeMiddleOfUnitsOnAxe(
    canvasWidth,
    canvasState
  );

  for (
    let x = 0 - middleOfUnitsOnXAxe;
    x < middleOfUnitsOnXAxe;
    x = x + canvasState.getRatio().unit
  ) {
    context.beginPath();
    context.strokeStyle = '#000000';
    context.font = '10px Arial';
    const offsetX = convertXToOffsetX(new UnitValue(x), canvasState);
    const offsetY = convertYToOffsetY(new UnitValue(0), canvasState);
    context.fillText(x.toString(), offsetX.value - 18, offsetY.value - 6);
    context.fillRect(offsetX.value, offsetY.value - 5, 1, 10);
  }

  const middleOfUnitsOnYAxe = computeMiddleOfUnitsOnAxe(
    canvasHeight,
    canvasState
  );

  for (
    let y = 0 - middleOfUnitsOnYAxe;
    y < middleOfUnitsOnYAxe;
    y = y + canvasState.getRatio().unit
  ) {
    context.beginPath();
    context.strokeStyle = '#000000';
    context.font = '12px Arial';
    const offsetX = convertXToOffsetX(new UnitValue(0), canvasState);
    const offsetY = convertYToOffsetY(new UnitValue(y), canvasState);
    context.fillText(y.toString(), offsetX.value - 18, offsetY.value - 6);
    context.fillRect(offsetX.value - 5, offsetY.value, 10, 1);
  }
}

export async function draw(
  context: CanvasRenderingContext2D,
  canvasState: CanvasState,
  center: UnitValuePoint,
  formulas: Array<Formula>
) {
  const result = await Promise.all([
    new Promise<void>((resolve) => {
      context.clearRect(
        0,
        0,
        canvasState.width.value,
        canvasState.height.value
      );
      drawDefaultMark(canvasState, center, context);
      resolve();
    }),
    getPointsToDrawFromFormulas(formulas, canvasState),
  ]).catch(() => {
    alert('Invalid operation');
  });

  if (Array.isArray(result)) {
    const [, pointsToDraw] = result;
    pointsToDraw.forEach(({ x, y }) => {
      context.fillRect(x, y, 1, 1);
    });
  }
}
