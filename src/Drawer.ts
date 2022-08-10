import { ImpossibleOperationError, UnknowElementError } from './errors';
import { Formula } from './Formula';
import { Router } from "./router";
import { FORBIDDEN_FUNCTIONS_NAMES } from './utils/constants';
import { isADivisibleNumber } from './utils/numbers';

interface Ratio {
    unit: number;
    pixelsPeerUnits: number;
}

export class Drawer {
    private readonly context: CanvasRenderingContext2D;
    private readonly canvasHeight: number;
    private readonly canvasWidth: number;
    private readonly loading: HTMLElement;
    private readonly zoomIterationInitialValue = 5;
    private zoomIteration = this.zoomIterationInitialValue;
    private pixelsPeerUnits: number;
    private middleOfUnitsOnXAxe: number;
    private middleOfUnitsOnYAxe: number;
    private forumlaCache: { [key: string]: Formula } = {}
    private ratio: Ratio = new Proxy({
        unit: 1,
        pixelsPeerUnits: 100
    }, {
        set(obj, p, value, receiver) {
            return true;
        }
    })

    constructor(router: Router, window: Window) {
        const canvas = window.document.querySelector('canvas');
        if (!canvas) {
            throw new UnknowElementError();
        }

        //     this.canvasHeight = canvas.height = canvas.offsetHeight - 4;
        //     this.canvasWidth = canvas.width = canvas.offsetWidth - 1;

        //     const context = canvas.getContext('2d');
        //     if (!context) {
        //         throw new UnknowElementError();
        //     }
        //     this.context = context;
        //     this.drawDefaultMark();

        //     const loading = document.querySelector<HTMLElement>('.loading');
        //     if (!loading) {
        //         throw new UnknowElementError();
        //     }

        //     this.loading = loading;

        router.queryParams$.subscribe(queryParams => {
            FORBIDDEN_FUNCTIONS_NAMES.forEach(key => {
                const value = queryParams[key]
                if (key === "ratio" && !!value) {

                    const [numerator, denominator] = value.split('/');

                    const unit = +numerator;
                    if (!isADivisibleNumber(unit)) {
                        throw new ImpossibleOperationError();
                    }

                    const pixelsPeerUnits = +denominator;
                    if (!isADivisibleNumber(pixelsPeerUnits)) {
                        throw new ImpossibleOperationError();
                    }

                    this.ratio.unit = unit;
                    this.ratio.pixelsPeerUnits = pixelsPeerUnits;
                }
            });

            // const zoom = +queryParams['zoom'];
            // if (!!zoom) {
            //     this.setPixelsPeerUnits(zoom);
            // } else {
            //     this.setPixelsPeerUnits(100);
            // }
            // delete queryParams["zoom"];
            // this.drawAllFormula(queryParams);
        });

        canvas.addEventListener('wheel', ({ deltaX, deltaY }) => {
            const isZoomIn = deltaX > deltaY;

            console.log(this.ratio);


            if (isZoomIn) {
                this.ratio.pixelsPeerUnits = this.pixelsPeerUnits;
                //     this.setPixelsPeerUnits(this.pixelsPeerUnits + this.zoomIteration);
                //     return;
            }

            // this.setPixelsPeerUnits(this.pixelsPeerUnits - this.zoomIteration);
        });
    }

    // private setPixelsPeerUnits(newValue: number) {
    //     if (newValue < this.zoomIteration) {
    //         return;
    //     }

    //     this.pixelsPeerUnits = newValue;

    //     // console.log(this.pixelsPeerUnits);

    //     if (this.pixelsPeerUnits <= 10) {
    //         this.zoomIteration = 1;
    //     } else if (this.pixelsPeerUnits <= 100) {
    //         this.zoomIteration = 2;
    //     } else if (this.pixelsPeerUnits <= 1000) {
    //         this.zoomIteration = 3;
    //     } else if (this.pixelsPeerUnits <= 10000) {
    //         this.zoomIteration = 4;
    //     } else {
    //         this.zoomIteration = this.zoomIterationInitialValue;
    //     }

    //     const nbrUnitsOnXAxe = Math.ceil(this.canvasWidth / this.pixelsPeerUnits);
    //     this.middleOfUnitsOnXAxe = Math.ceil(nbrUnitsOnXAxe / 2);

    //     const nbrUnitsOnYAxe = Math.ceil(this.canvasHeight / this.pixelsPeerUnits);
    //     this.middleOfUnitsOnYAxe = Math.ceil(nbrUnitsOnYAxe / 2);

    //     this.drawAllFormula(this.forumlaCache);
    // }

    // private drawAllFormula(queryParams: QueryParams) {
    //     this.loading.style.visibility = 'initial';
    //     this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    //     this.drawDefaultMark();

    //     Object.keys(queryParams).forEach(key => {
    //         const formula = queryParams[key];
    //         this.forumlaCache[key] = formula;
    //         this.drawFromFormula(formula);
    //     });

    //     this.loading.style.visibility = "hidden";
    // }

    // private drawFromFormula(formula: Formula) {
    // for (let x = 0 - this.middleOfUnits; x < this.middleOfUnits + 1; x = x + 1 / this.pixelsPeerUnits) {
    //     const y = eval(formula.toLowerCase());
    //     const gridX = this.getGridX(x);
    //     const gridY = this.getGridY(y);
    //     this.context?.fillRect(gridX, gridY, 1, 1);
    // }
    // }

    // private drawDefaultMark() {
    //     this.context.beginPath();
    //     this.context.strokeStyle = 'red';
    //     this.context.lineWidth = 1;
    //     this.context.moveTo(this.canvasWidth / 2, 0);
    //     this.context.lineTo(this.canvasWidth / 2, this.canvasHeight);
    //     this.context.stroke();

    //     this.context.beginPath();
    //     this.context.strokeStyle = 'grey';
    //     this.context.lineWidth = 1;
    //     this.context.moveTo(0, this.canvasHeight / 2);
    //     this.context.lineTo(this.canvasWidth, this.canvasHeight / 2);
    //     this.context.stroke();

    //     for (let x = 0 - this.middleOfUnitsOnXAxe; x < this.middleOfUnitsOnXAxe + 1; ++x) {
    //         this.context.beginPath();
    //         this.context.strokeStyle = '#000000';
    //         this.context.font = "12px Arial";
    //         this.context.fillText(x.toString(), this.getGridX(x) - 18, this.getGridY(0) - 6);
    //         this.context.fillRect(this.getGridX(x), this.getGridY(0) - 5, 1, 10);
    //     }

    //     for (let y = 0 - this.middleOfUnitsOnYAxe; y < this.middleOfUnitsOnYAxe + 1; ++y) {
    //         this.context.beginPath();
    //         this.context.strokeStyle = '#000000';
    //         this.context.font = "12px Arial";
    //         this.context.fillText(y.toString(), this.getGridX(0) - 18, this.getGridY(y) - 6);
    //         this.context.fillRect(this.getGridX(0) - 5, this.getGridY(y), 10, 1);
    //     }
    // }

    // private getGridX(x: number) {
    //     return x + (this.canvasWidth / 2) + (x * this.pixelsPeerUnits);
    // }

    // private getGridY(y: number) {
    //     return y + (this.canvasHeight / 2) - (y * this.pixelsPeerUnits);
    // }
}