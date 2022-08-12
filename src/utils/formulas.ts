import { Formula, PixelValue } from "../domain";
import { convertOffsetXToX, convertYToOffsetY } from "./conversion";
import { PointToDraw } from "./PointToDraw";

export function getPointsToDrawFromFormula(formula: Formula, canvasWidth: PixelValue, canvasHeight: PixelValue, pixelsPeerUnits: number) {
    return new Promise<Array<PointToDraw>>(resolve => {
        const pointsToDraw = new Array<PointToDraw>();

        const fn = new Function(`return function(x) { return ${formula.content.toLowerCase()}; }`)() as (x: number) => number;

        for (let offsetX = 0; offsetX < canvasWidth.value + 1; ++offsetX) {
            const x = convertOffsetXToX(new PixelValue(offsetX), canvasWidth, pixelsPeerUnits);
            const y = fn(x.value);
            const offsetY = convertYToOffsetY(new PixelValue(y), canvasHeight, pixelsPeerUnits).value;

            if (offsetY > 0 && offsetY < canvasHeight.value) {
                pointsToDraw.push(new PointToDraw({
                    offsetX,
                    offsetY
                }))
            }
        }

        resolve(pointsToDraw);
    })
}

export function getPointsToDrawFromFormulas(formulas: Array<Formula>, canvasWidth: PixelValue, canvasHeight: PixelValue, pixelsPeerUnits: number) {
    return Promise.all(
        formulas.map(formula => getPointsToDrawFromFormula(formula, canvasWidth, canvasHeight, pixelsPeerUnits))
    ).then(pointsToDraw => pointsToDraw.reduce((acc, array) => acc.concat(array), new Array<PointToDraw>()));
}