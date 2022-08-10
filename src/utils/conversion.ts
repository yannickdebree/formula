import { PixelValue, UnitValue } from '../domain';

export function convertOffsetXToX(offsetX: PixelValue, containerWidth: PixelValue, pixelsPeerUnit: number) {
    return new UnitValue((offsetX.value - (containerWidth.value / 2)) / pixelsPeerUnit);
}

export function convertXToOffsetX(x: UnitValue, containerWidth: PixelValue, pixelsPeerUnit: number) {
    return new PixelValue((containerWidth.value / 2) + x.value * pixelsPeerUnit);
}

export function convertOffsetYToY(offsetY: PixelValue, containerHeight: PixelValue, pixelsPeerUnit: number) {
    const firstComputing = (containerHeight.value / 2) - offsetY.value;
    return new UnitValue((firstComputing) / (firstComputing === 0 ? pixelsPeerUnit : (-1 * pixelsPeerUnit)));
}

export function convertYToOffsetY(y: UnitValue, containerHeight: PixelValue, pixelsPeerUnit: number) {
    return new PixelValue((containerHeight.value / 2) + (y.value * pixelsPeerUnit));
}