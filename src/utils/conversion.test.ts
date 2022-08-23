import { PixelValue, Ratio, UnitValue } from '../domain';
import { CanvasState } from './CanvasState';
import {
  convertOffsetXToX,
  convertOffsetYToY,
  convertXToOffsetX,
  convertYToOffsetY,
} from './conversion';

function runTests<Test>(tests: Array<Test>, fn: (test: Test) => void) {
  tests.forEach((test) => {
    fn(test);
  });
}

describe(convertOffsetXToX.name, () => {
  it('Should correctly convert offsetX to x', () => {
    runTests(
      [
        {
          offsetX: new PixelValue(400),
          canvasState: new CanvasState(
            new PixelValue(400),
            new PixelValue(800),
            new Ratio(1, 100)
          ),
          result: new UnitValue(0),
        },
        {
          offsetX: new PixelValue(475),
          canvasState: new CanvasState(
            new PixelValue(400),
            new PixelValue(950),
            new Ratio(1, 100)
          ),
          result: new UnitValue(0),
        },
        {
          offsetX: new PixelValue(800),
          canvasState: new CanvasState(
            new PixelValue(400),
            new PixelValue(1000),
            new Ratio(1, 100)
          ),
          result: new UnitValue(3),
        },
        {
          offsetX: new PixelValue(300),
          canvasState: new CanvasState(
            new PixelValue(400),
            new PixelValue(1000),
            new Ratio(1, 100)
          ),
          result: new UnitValue(-2),
        },
      ],
      ({ offsetX, canvasState, result }) => {
        expect(convertOffsetXToX(offsetX, canvasState).value).toBe(
          result.value
        );
      }
    );
  });
});

describe(convertXToOffsetX.name, () => {
  it('Should correctly convert x to offsetX', () => {
    runTests(
      [
        {
          x: new UnitValue(0),
          canvasState: new CanvasState(
            new PixelValue(400),
            new PixelValue(800),
            new Ratio(1, 100)
          ),
          result: new UnitValue(400),
        },
        {
          x: new UnitValue(0),
          canvasState: new CanvasState(
            new PixelValue(400),
            new PixelValue(950),
            new Ratio(1, 100)
          ),
          result: new UnitValue(475),
        },
        {
          x: new UnitValue(3),
          canvasState: new CanvasState(
            new PixelValue(400),
            new PixelValue(1000),
            new Ratio(1, 100)
          ),
          result: new UnitValue(800),
        },
        {
          x: new UnitValue(-2),
          canvasState: new CanvasState(
            new PixelValue(400),
            new PixelValue(1000),
            new Ratio(1, 100)
          ),
          result: new UnitValue(300),
        },
      ],
      ({ x, canvasState, result }) => {
        expect(convertXToOffsetX(x, canvasState).value).toBe(result.value);
      }
    );
  });
});

describe(convertOffsetYToY.name, () => {
  it('Should correctly convert offsetY to y', () => {
    runTests(
      [
        {
          offsetY: new UnitValue(400),
          canvasState: new CanvasState(
            new PixelValue(800),
            new PixelValue(1000),
            new Ratio(1, 100)
          ),
          result: new UnitValue(0),
        },
        {
          offsetY: new UnitValue(475),
          canvasState: new CanvasState(
            new PixelValue(950),
            new PixelValue(1000),
            new Ratio(1, 100)
          ),
          result: new UnitValue(0),
        },
        {
          offsetY: new UnitValue(800),
          canvasState: new CanvasState(
            new PixelValue(1000),
            new PixelValue(1000),
            new Ratio(1, 100)
          ),
          result: new UnitValue(3),
        },
        {
          offsetY: new UnitValue(300),
          canvasState: new CanvasState(
            new PixelValue(1000),
            new PixelValue(1000),
            new Ratio(1, 100)
          ),
          result: new UnitValue(-2),
        },
      ],
      ({ offsetY, canvasState, result }) => {
        expect(convertOffsetYToY(offsetY, canvasState).value).toBe(
          result.value
        );
      }
    );
  });
});

describe(convertYToOffsetY.name, () => {
  it('Should correctly convert y to offsetY', () => {
    runTests(
      [
        {
          y: new UnitValue(0),
          canvasState: new CanvasState(
            new PixelValue(800),
            new PixelValue(1000),
            new Ratio(1, 100)
          ),
          result: new PixelValue(400),
        },
        {
          y: new UnitValue(0),
          canvasState: new CanvasState(
            new PixelValue(950),
            new PixelValue(1000),
            new Ratio(1, 100)
          ),
          result: new PixelValue(475),
        },
        {
          y: new UnitValue(3),
          canvasState: new CanvasState(
            new PixelValue(1000),
            new PixelValue(1000),
            new Ratio(1, 100)
          ),
          result: new PixelValue(200),
        },
        {
          y: new UnitValue(-2),
          canvasState: new CanvasState(
            new PixelValue(1000),
            new PixelValue(1000),
            new Ratio(1, 100)
          ),
          result: new PixelValue(700),
        },
      ],
      ({ y, canvasState, result }) => {
        expect(convertYToOffsetY(y, canvasState).value).toBe(result.value);
      }
    );
  });
});
