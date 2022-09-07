import { map } from 'rxjs';
import {
  CanvasState,
  Context2DNotAvailableError,
  draw,
  Formula,
  PixelValue,
  Ratio,
  UnitValue,
  UnitValuePoint,
} from '../domain';
import {
  Encoder,
  Inject,
  OnInit,
  Router,
  UnknowDOMElementError,
} from '../system';
import { QUERY_PARAMS_KEY } from '../utils';

@Inject(Router, Encoder, Window)
export class Drawer implements OnInit {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly canvasState: CanvasState;
  private formulas = new Array<Formula>();
  private center = new UnitValuePoint(new UnitValue(0), new UnitValue(0));

  constructor(
    private readonly router: Router,
    private readonly encoder: Encoder,
    window: Window
  ) {
    const canvas = window.document.querySelector('canvas');
    if (!canvas) {
      throw new UnknowDOMElementError('canvas');
    }
    this.canvas = canvas;

    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Context2DNotAvailableError();
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
        if (!ratioAsString) return;
        const [unitAsString, pixelsPeerUnitAsString] = ratioAsString.split('/');
        const newRatio = new Ratio(+unitAsString, +pixelsPeerUnitAsString);
        this.canvasState.setRatio(newRatio);
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
        draw(this.context, this.canvasState, this.center, this.formulas);
      });
  }
}
