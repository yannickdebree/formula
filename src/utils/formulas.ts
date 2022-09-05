import { CanvasState } from './CanvasState';
import { convertOffsetXToX, convertYToOffsetY } from './conversion';
import { Formula } from './Formula';
import { PixelValue } from './PixelValue';
import { PointToDraw } from './PointToDraw';

const alphabet = [
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'y',
  'z',
  'a',
  'b',
  'c',
  'd',
  'e',
];

export function findNextFormulaName(
  existingNames: Array<string>,
  _alphabet = alphabet
): string {
  const alphabetLength = _alphabet.length;
  for (let i = 0; i < alphabetLength; ++i) {
    if (!existingNames.includes(_alphabet[i])) {
      return _alphabet[i];
    }
  }
  return findNextFormulaName(
    existingNames,
    alphabet.map((letter) => letter + "'")
  );
}

export function getPointsToDrawFromFormula(
  formula: Formula,
  canvasState: CanvasState
) {
  return new Promise<Array<PointToDraw>>((resolve) => {
    const pointsToDraw = new Array<PointToDraw>();

    const fn = new Function(
      `return function(x) { return ${formula.content
        .toLowerCase()
        .replace(/\s/g, '')
        .trim()}; }`
    )() as (x: number) => number;

    for (let offsetX = 0; offsetX < canvasState.width.value + 1; ++offsetX) {
      const x = convertOffsetXToX(new PixelValue(offsetX), canvasState);
      const y = fn(x.value);
      const offsetY = convertYToOffsetY(new PixelValue(y), canvasState).value;

      if (offsetY > 0 && offsetY < canvasState.height.value) {
        pointsToDraw.push(
          new PointToDraw({
            offsetX,
            offsetY,
          })
        );
      }
    }

    resolve(pointsToDraw);
  });
}

export function getPointsToDrawFromFormulas(
  formulas: Array<Formula>,
  canvasState: CanvasState
) {
  return Promise.all(
    formulas.map((formula) => getPointsToDrawFromFormula(formula, canvasState))
  ).then((pointsToDraw) =>
    pointsToDraw.reduce(
      (acc, array) => acc.concat(array),
      new Array<PointToDraw>()
    )
  );
}
