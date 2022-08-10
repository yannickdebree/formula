import { UnknowElementError } from "./domain";
import { Formula } from './Formula';
import { Router, QueryParams } from "./router";

export class Drawer {
    private readonly context: CanvasRenderingContext2D;
    private readonly canvasHeight: number;
    private readonly canvasWidth: number;
    private readonly loading: HTMLElement;
    private readonly zoomIterationInitialValue = 5;
    private zoomIteration = this.zoomIterationInitialValue;
    private pixelsPeerUnits: number;
    private middleOfUnits: number;
    private forumlaCache: { [key: string]: Formula } = {}

    constructor(router: Router, window: Window) {
        const canvas = window.document.querySelector('canvas');
        if (!canvas) {
            throw new UnknowElementError();
        }

        this.canvasHeight = canvas.height = canvas.offsetHeight - 4;
        this.canvasWidth = canvas.width = canvas.offsetWidth - 1;

        const context = canvas.getContext('2d');
        if (!context) {
            throw new UnknowElementError();
        }
        this.context = context;
        this.drawDefaultMark();

        const loading = document.querySelector<HTMLElement>('.loading');
        if (!loading) {
            throw new UnknowElementError();
        }

        this.loading = loading;


        router.events.subscribe(options => {
            const zoom = +options['zoom'];
            if (!!zoom) {
                this.setPixelsPeerUnits(zoom);
            } else {
                this.setPixelsPeerUnits(100);
            }
            delete options["zoom"];
            this.drawAllFormula(options);
        });

        canvas.addEventListener('wheel', ({ deltaX, deltaY }) => {
            const isZoomIn = deltaX > deltaY;

            if (isZoomIn) {
                this.setPixelsPeerUnits(this.pixelsPeerUnits + this.zoomIteration);
                return;
            }

            this.setPixelsPeerUnits(this.pixelsPeerUnits - this.zoomIteration);
        });
    }

    setPixelsPeerUnits(newValue: number) {
        if (newValue < this.zoomIteration) {
            return;
        }

        this.pixelsPeerUnits = newValue;

        // console.log(this.pixelsPeerUnits);

        if (this.pixelsPeerUnits <= 10) {
            this.zoomIteration = 1;
        } else if (this.pixelsPeerUnits <= 100) {
            this.zoomIteration = 2;
        } else if (this.pixelsPeerUnits <= 1000) {
            this.zoomIteration = 3;
        } else if (this.pixelsPeerUnits <= 10000) {
            this.zoomIteration = 4;
        } else {
            this.zoomIteration = this.zoomIterationInitialValue;
        }

        const nbrUnits = Math.ceil(this.canvasWidth / this.pixelsPeerUnits);
        this.middleOfUnits = Math.ceil(nbrUnits / 2);
        this.drawAllFormula(this.forumlaCache);
    }

    private drawAllFormula(queryParams: QueryParams) {
        this.loading.style.visibility = 'initial';
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.drawDefaultMark();

        Object.keys(queryParams).forEach(key => {
            const formula = queryParams[key];
            this.forumlaCache[key] = formula;
            this.drawFromFormula(formula);
        });

        this.loading.style.visibility = "hidden";
    }

    private drawFromFormula(formula: Formula) {
        // for (let x = 0 - this.middleOfUnits; x < this.middleOfUnits + 1; x = x + 1 / this.pixelsPeerUnits) {
        //     const y = eval(formula.toLowerCase());
        //     const gridX = this.getGridX(x);
        //     const gridY = this.getGridY(y);
        //     this.context?.fillRect(gridX, gridY, 1, 1);
        // }
    }

    private drawDefaultMark() {
        this.context.beginPath();
        this.context.strokeStyle = 'red';
        this.context.lineWidth = 1;
        this.context.moveTo(this.canvasWidth / 2, 0);
        this.context.lineTo(this.canvasWidth / 2, this.canvasHeight);
        this.context.stroke();

        this.context.beginPath();
        this.context.strokeStyle = 'grey';
        this.context.lineWidth = 1;
        this.context.moveTo(0, this.canvasHeight / 2);
        this.context.lineTo(this.canvasWidth, this.canvasHeight / 2);
        this.context.stroke();

        for (let x = 0 - this.middleOfUnits; x < this.middleOfUnits + 1; ++x) {
            this.context.beginPath();
            this.context.strokeStyle = '#000000';
            this.context.font = "12px Arial";
            this.context.fillText(x.toString(), this.getGridX(x) - 18, this.getGridY(0) - 6);
            this.context.fillRect(this.getGridX(x), this.getGridY(0) - 5, 1, 10);
        }
    }

    private getGridX(x: number) {
        return x + (this.canvasWidth / 2) + (x * this.pixelsPeerUnits);
    }

    private getGridY(y: number) {
        return y + (this.canvasHeight / 2) - (y * this.pixelsPeerUnits);
    }
}