import { PixelValue, UnitValue } from '../domain';

export function convertOffsetXToX(offsetX: PixelValue, canvasWidth: PixelValue, pixelsPeerUnit: number) {
    return new UnitValue((offsetX.value - (canvasWidth.value / 2)) / pixelsPeerUnit);
}

export function convertXToOffsetX(x: UnitValue, canvasWidth: PixelValue, pixelsPeerUnit: number) {
    return new PixelValue((canvasWidth.value / 2) + x.value * pixelsPeerUnit);
}

export function convertOffsetYToY(offsetY: PixelValue, canvasHeight: PixelValue, pixelsPeerUnit: number) {
    const firstComputing = (canvasHeight.value / 2) - offsetY.value;
    return new UnitValue((firstComputing) / (firstComputing === 0 ? pixelsPeerUnit : (-1 * pixelsPeerUnit)));
}

export function convertYToOffsetY(y: number, canvasHeight: number, pixelsPeerUnit: number) {
    return (canvasHeight / 2) - (y * pixelsPeerUnit);
}