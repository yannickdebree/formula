import { PixelValue, UnitValue } from "../domain";
import { convertOffsetXToX, convertOffsetYToY, convertXToOffsetX } from "./conversion";

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
                                canvasWidth: new PixelValue(800),
                                pixelsPeerUnit: 100,
                                result: new UnitValue(0)
                        },
                        {
                                offsetX: new PixelValue(475),
                                canvasWidth: new PixelValue(950),
                                pixelsPeerUnit: 100,
                                result: new UnitValue(0)
                        },
                        {
                                offsetX: new PixelValue(800),
                                canvasWidth: new PixelValue(1000),
                                pixelsPeerUnit: 100,
                                result: new UnitValue(3)
                        },
                        {
                                offsetX: new PixelValue(300),
                                canvasWidth: new PixelValue(1000),
                                pixelsPeerUnit: 100,
                                result: new UnitValue(-2)
                        }
                ], ({ offsetX, canvasWidth, pixelsPeerUnit, result }) => {
                        expect(convertOffsetXToX(offsetX, canvasWidth, pixelsPeerUnit).value).toBe(result.value);
                });
        });

        it("Should correctly convert x to offsetX", () => {
                runTests([
                        {
                                x: new UnitValue(0),
                                canvasWidth: new PixelValue(800),
                                pixelsPeerUnit: 100,
                                result: new PixelValue(400)
                        },
                        {
                                x: new UnitValue(0),
                                canvasWidth: new PixelValue(950),
                                pixelsPeerUnit: 100,
                                result: new PixelValue(475)
                        },
                        {
                                x: new UnitValue(3),
                                canvasWidth: new PixelValue(1000),
                                pixelsPeerUnit: 100,
                                result: new PixelValue(800)
                        },
                        {
                                x: new UnitValue(-2),
                                canvasWidth: new PixelValue(1000),
                                pixelsPeerUnit: 100,
                                result: new PixelValue(300)
                        }
                ], ({ x, canvasWidth, result, pixelsPeerUnit }) => {
                        expect(convertXToOffsetX(x, canvasWidth, pixelsPeerUnit).value).toBe(result.value);
                });
        });

        it("Should correctly convert offsetY to y", () => {
                runTests([
                        {
                                offsetY: new PixelValue(400),
                                canvasHeight: new PixelValue(800),
                                pixelsPeerUnit: 100,
                                result: new UnitValue(0)
                        },
                        {
                                offsetY: new PixelValue(475),
                                canvasHeight: new PixelValue(950),
                                pixelsPeerUnit: 100,
                                result: new UnitValue(0)
                        },
                        {
                                offsetY: new PixelValue(800),
                                canvasHeight: new PixelValue(1000),
                                pixelsPeerUnit: 100,
                                result: new UnitValue(3)
                        },
                        {
                                offsetY: new PixelValue(300),
                                canvasHeight: new PixelValue(1000),
                                pixelsPeerUnit: 100,
                                result: new UnitValue(-2)
                        }
                ], ({ offsetY, canvasHeight, pixelsPeerUnit, result }) => {
                        expect(convertOffsetYToY(offsetY, canvasHeight, pixelsPeerUnit).value).toBe(result.value);
                });
        });
});