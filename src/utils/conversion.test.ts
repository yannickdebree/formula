import { PixelValue, UnitValue } from "../domain";
import { convertOffsetXToX, convertOffsetYToY, convertXToOffsetX, convertYToOffsetY } from "./conversion";

function runTests<Test>(tests: Array<Test>, fn: (test: Test) => void) {
        tests.forEach((test) => {
                fn(test);
        });
}

describe(convertOffsetXToX.name, () => {
        it("Should correctly convert offsetX to x", () => {
                runTests([
                        {
                                offsetX: new PixelValue(400),
                                containerWidth: new PixelValue(800),
                                pixelsPeerUnit: 100,
                                result: new UnitValue(0)
                        },
                        {
                                offsetX: new PixelValue(475),
                                containerWidth: new PixelValue(950),
                                pixelsPeerUnit: 100,
                                result: new UnitValue(0)
                        },
                        {
                                offsetX: new PixelValue(800),
                                containerWidth: new PixelValue(1000),
                                pixelsPeerUnit: 100,
                                result: new UnitValue(3)
                        },
                        {
                                offsetX: new PixelValue(300),
                                containerWidth: new PixelValue(1000),
                                pixelsPeerUnit: 100,
                                result: new UnitValue(-2)
                        }
                ], ({ offsetX, containerWidth, pixelsPeerUnit, result }) => {
                        expect(convertOffsetXToX(offsetX, containerWidth, pixelsPeerUnit).value).toBe(result.value);
                });
        });
});

describe(convertXToOffsetX.name, () => {
        it("Should correctly convert x to offsetX", () => {
                runTests([
                        {
                                x: new UnitValue(0),
                                containerWidth: new PixelValue(800),
                                pixelsPeerUnit: 100,
                                result: new PixelValue(400)
                        },
                        {
                                x: new UnitValue(0),
                                containerWidth: new PixelValue(950),
                                pixelsPeerUnit: 100,
                                result: new PixelValue(475)
                        },
                        {
                                x: new UnitValue(3),
                                containerWidth: new PixelValue(1000),
                                pixelsPeerUnit: 100,
                                result: new PixelValue(800)
                        },
                        {
                                x: new UnitValue(-2),
                                containerWidth: new PixelValue(1000),
                                pixelsPeerUnit: 100,
                                result: new PixelValue(300)
                        }
                ], ({ x, containerWidth, result, pixelsPeerUnit }) => {
                        expect(convertXToOffsetX(x, containerWidth, pixelsPeerUnit).value).toBe(result.value);
                });
        });
});

describe(convertOffsetYToY.name, () => {
        it("Should correctly convert offsetY to y", () => {
                runTests([
                        {
                                offsetY: new PixelValue(400),
                                containerHeight: new PixelValue(800),
                                pixelsPeerUnit: 100,
                                result: new UnitValue(0)
                        },
                        {
                                offsetY: new PixelValue(475),
                                containerHeight: new PixelValue(950),
                                pixelsPeerUnit: 100,
                                result: new UnitValue(0)
                        },
                        {
                                offsetY: new PixelValue(800),
                                containerHeight: new PixelValue(1000),
                                pixelsPeerUnit: 100,
                                result: new UnitValue(3)
                        },
                        {
                                offsetY: new PixelValue(300),
                                containerHeight: new PixelValue(1000),
                                pixelsPeerUnit: 100,
                                result: new UnitValue(-2)
                        }
                ], ({ offsetY, containerHeight, pixelsPeerUnit, result }) => {
                        expect(convertOffsetYToY(offsetY, containerHeight, pixelsPeerUnit).value).toBe(result.value);
                });
        });
});

describe(convertYToOffsetY.name, () => {
        it("Should correctly convert y to offsetY", () => {
                runTests([
                        {
                                y: new UnitValue(0),
                                containerHeight: new PixelValue(800),
                                pixelsPeerUnit: 100,
                                result: new PixelValue(400)
                        },
                        {
                                y: new UnitValue(0),
                                containerHeight: new PixelValue(950),
                                pixelsPeerUnit: 100,
                                result: new PixelValue(475)
                        },
                        {
                                y: new UnitValue(3),
                                containerHeight: new PixelValue(1000),
                                pixelsPeerUnit: 100,
                                result: new PixelValue(800)
                        },
                        {
                                y: new UnitValue(-2),
                                containerHeight: new PixelValue(1000),
                                pixelsPeerUnit: 100,
                                result: new PixelValue(300)
                        }
                ], ({ y, containerHeight, result, pixelsPeerUnit }) => {
                        expect(convertYToOffsetY(y, containerHeight, pixelsPeerUnit).value).toBe(result.value);
                });
        });
});