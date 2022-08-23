import { map } from 'rxjs';
import { ContainerInstance, Service } from 'typedi';
import { Encoder, OnInit, Router } from '../core';
import {
  Formula,
  PixelValue,
  Ratio,
  UnitValue,
  UnknowElementError,
} from '../domain';
import {
  CanvasState,
  convertXToOffsetX,
  convertYToOffsetY,
  getPointsToDrawFromFormulas,
  QUERY_PARAMS_KEY,
} from '../utils';

@Service()
export class Drawer implements OnInit {
  private readonly router: Router;
  private readonly canvas: HTMLCanvasElement;
  private readonly encoder: Encoder;
  private readonly context: CanvasRenderingContext2D;
  private readonly canvasState: CanvasState;
  private formulas = new Array<Formula>();
  private center = {
    x: new UnitValue(0),
    y: new UnitValue(0),
  };

  constructor(container: ContainerInstance) {
    this.router = container.get(Router);
    this.encoder = container.get(Encoder);
    const window = container.get(Window);

    const canvas = window.document.querySelector('canvas');
    if (!canvas) {
      throw new UnknowElementError();
    }
    this.canvas = canvas;

    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new UnknowElementError();
    }
    this.context = context;

    this.canvasState = new CanvasState(
      new PixelValue((this.canvas.height = this.canvas.offsetHeight)),
      new PixelValue((this.canvas.width = this.canvas.offsetWidth)),
      new Ratio(1, 100)
    );
  }

  onInit() {
    this.canvas.addEventListener('wheel', (event) => {
      const ratio = this.canvasState.getRatio();
      let unit = ratio.unit;
      let pixelsPeerUnit = ratio.pixelsPeerUnit;
      let scale = 1;

      if (event.deltaY - event.deltaX > 0) {
        pixelsPeerUnit = pixelsPeerUnit - scale;
      } else {
        pixelsPeerUnit = pixelsPeerUnit + scale;
      }

      if (pixelsPeerUnit > 0) {
        const ratioAsString = this.encoder.encode(`${unit}/${pixelsPeerUnit}`);
        this.router.navigate({
          [QUERY_PARAMS_KEY.RATIO]: ratioAsString,
        });
      }
    });

    this.router.queryParams$
      .pipe(
        map((queryParams) =>
          !!queryParams[QUERY_PARAMS_KEY.RATIO]
            ? this.encoder.decode(queryParams[QUERY_PARAMS_KEY.RATIO])
            : null
        )
      )
      .subscribe((ratioAsString) => {
        if (!!ratioAsString) {
          try {
            const [unitAsString, pixelsPeerUnitAsString] =
              ratioAsString.split('/');
            const newRatio = new Ratio(+unitAsString, +pixelsPeerUnitAsString);
            this.canvasState.setRatio(newRatio);
          } catch (err) {
            alert('Ratio implementation error');
          }
        }
      });

    this.router.queryParams$
      .pipe(
        map((queryParams) =>
          !!queryParams[QUERY_PARAMS_KEY.FORMULAS]
            ? JSON.parse(
                this.encoder.decode(queryParams[QUERY_PARAMS_KEY.FORMULAS])
              )
            : {}
        )
      )
      .subscribe((formulasInQueryParams) => {
        this.formulas = [];
        Object.keys(formulasInQueryParams).forEach((formulaName) => {
          this.formulas.push(
            new Formula(formulaName, formulasInQueryParams[formulaName])
          );
        });
        this.draw();
      });
  }

  private async draw() {
    const result = await Promise.all([
      new Promise<void>((resolve) => {
        this.context.clearRect(
          0,
          0,
          this.canvasState.width.value,
          this.canvasState.height.value
        );
        this.drawDefaultMark();
        resolve();
      }),
      getPointsToDrawFromFormulas(this.formulas, this.canvasState),
    ]).catch(() => {
      alert('Invalid operation');
    });

    if (Array.isArray(result)) {
      const [, pointsToDraw] = result;
      pointsToDraw.forEach(({ x, y }) => {
        this.context.fillRect(x, y, 1, 1);
      });
    }
  }

  private drawDefaultMark() {
    const canvasWidth = this.canvasState.width;
    const canvasHeight = this.canvasState.height;
    const isMinXOutsideCanvas = this.center.x.value - canvasWidth.value / 2 < 0;
    const isMinYOutsideCanvas =
      this.center.y.value - canvasHeight.value / 2 < 0;
    const isMaXYOutsideCanvas = this.center.x.value + canvasWidth.value / 2 > 0;
    const isMaxYOutsideCanvas =
      this.center.y.value + canvasHeight.value / 2 > 0;

    if (isMinXOutsideCanvas && isMaXYOutsideCanvas) {
      this.context.beginPath();
      this.context.strokeStyle = 'red';
      this.context.lineWidth = 1;
      const xInUnits =
        this.center.x.value >= 0
          ? this.center.x
          : new UnitValue(-this.center.x.value);
      const xInPixels = convertXToOffsetX(xInUnits, this.canvasState);
      this.context.moveTo(xInPixels.value, 0);
      this.context.lineTo(xInPixels.value, canvasHeight.value);
      this.context.stroke();
    }

    if (isMinYOutsideCanvas && isMaxYOutsideCanvas) {
      this.context.beginPath();
      this.context.strokeStyle = 'grey';
      this.context.lineWidth = 1;
      const yInUnits =
        this.center.y.value >= 0
          ? this.center.y
          : new UnitValue(-this.center.y.value);
      const yInPixels = convertYToOffsetY(yInUnits, this.canvasState);
      this.context.moveTo(0, yInPixels.value);
      this.context.lineTo(canvasWidth.value, yInPixels.value);
      this.context.stroke();
    }

    const middleOfUnitsOnXAxe = this.computeMiddleOfUnitsOnAxe(canvasWidth);

    for (
      let x = 0 - middleOfUnitsOnXAxe;
      x < middleOfUnitsOnXAxe;
      x = x + this.canvasState.getRatio().unit
    ) {
      this.context.beginPath();
      this.context.strokeStyle = '#000000';
      this.context.font = '10px Arial';
      const offsetX = convertXToOffsetX(new UnitValue(x), this.canvasState);
      const offsetY = convertYToOffsetY(new UnitValue(0), this.canvasState);
      this.context.fillText(
        x.toString(),
        offsetX.value - 18,
        offsetY.value - 6
      );
      this.context.fillRect(offsetX.value, offsetY.value - 5, 1, 10);
    }

    const middleOfUnitsOnYAxe = this.computeMiddleOfUnitsOnAxe(canvasHeight);

    for (
      let y = 0 - middleOfUnitsOnYAxe;
      y < middleOfUnitsOnYAxe;
      y = y + this.canvasState.getRatio().unit
    ) {
      this.context.beginPath();
      this.context.strokeStyle = '#000000';
      this.context.font = '12px Arial';
      const offsetX = convertXToOffsetX(new UnitValue(0), this.canvasState);
      const offsetY = convertYToOffsetY(new UnitValue(y), this.canvasState);
      this.context.fillText(
        y.toString(),
        offsetX.value - 18,
        offsetY.value - 6
      );
      this.context.fillRect(offsetX.value - 5, offsetY.value, 10, 1);
    }
  }

  private computeMiddleOfUnitsOnAxe(axeSize: PixelValue) {
    return Math.ceil(
      Math.ceil(axeSize.value / this.canvasState.getRatio().pixelsPeerUnit) / 2
    );
  }
}
