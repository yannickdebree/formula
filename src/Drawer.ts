import { debounceTime, filter, startWith, Subject } from 'rxjs';
import { ImpossibleOperationError, UnknowElementError } from './errors';
import { Router } from './router';
import { FORBIDDEN_FUNCTIONS_NAMES } from './utils/constants';
import { isADivisibleNumber, isANumber } from './utils/numbers';

export class Drawer {
    private readonly context: CanvasRenderingContext2D;
    private readonly canvasHeight: number;
    private readonly canvasWidth: number;
    private ratio = {
        unit: 1,
        pixelsPeerUnits: 100
    };
    private center = {
        x: 0,
        y: 0
    }

    constructor(router: Router, window: Window) {
        const canvas = window.document.querySelector('canvas');
        if (!canvas) {
            throw new UnknowElementError();
        }

        const context = canvas.getContext("2d");
        if (!context) {
            throw new UnknowElementError();
        }
        this.context = context;
        this.canvasHeight = canvas.height = canvas.offsetHeight;
        this.canvasWidth = canvas.width = canvas.offsetWidth;

        const drawingOrder$ = new Subject<void>();
        drawingOrder$.pipe(startWith(void 0), debounceTime(0)).subscribe(() => {
            this.draw();
        });

        const queryParams$ = router.queryParams$;

        queryParams$.pipe(
            filter(queryParams => !!Object.keys(queryParams).find(key => !FORBIDDEN_FUNCTIONS_NAMES.includes(key)))
        ).subscribe(() => {
            drawingOrder$.next();
        })

        queryParams$.pipe(
            filter(queryParams => !!Object.keys(queryParams).find(key => FORBIDDEN_FUNCTIONS_NAMES.includes(key)))
        ).subscribe(queryParams => {
            FORBIDDEN_FUNCTIONS_NAMES.forEach(key => {
                const value = queryParams[key]
                if (key === "ratio" && !!value) {
                    const [numerator, denominator] = atob(value).split('/');

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

                    drawingOrder$.next();
                    return;
                }

                if (key === "center" && !!value) {
                    const [newX, newY] = atob(value).split('/');

                    const x = parseFloat(newX);
                    if (!isANumber(x)) {
                        throw new ImpossibleOperationError();
                    }

                    const y = parseFloat(newY);
                    if (!isANumber(y)) {
                        throw new ImpossibleOperationError();
                    }

                    this.center.x = x;
                    this.center.y = y;

                    drawingOrder$.next();
                    return;
                }
            });
        });

        canvas.addEventListener('wheel', () => {
            this.ratio = this.ratio;
            router.navigate({
                ratio: btoa(`${this.ratio.unit}/${this.ratio.pixelsPeerUnits}`)
            });
        });

        let originalMousePosition: { offsetX: number; offsetY: number } | undefined = undefined;

        canvas.addEventListener('mousedown', (event) => {
            originalMousePosition = { offsetX: event.offsetX, offsetY: event.offsetY };
            canvas.style.cursor = "grabbing";
        });

        canvas.addEventListener('mousemove', (event) => {
            if (!!originalMousePosition) {
                const offsetX = event.offsetX;
                const offsetY = event.offsetY;

                const differenceX = offsetX - originalMousePosition.offsetX;
                const differenceY = offsetY - originalMousePosition.offsetY;

                this.context.fillRect(offsetX, offsetY, 2, 2);

                const newOffsetX = originalMousePosition.offsetX + -1 * differenceX;
                const newOffsetY = originalMousePosition.offsetY + -1 * differenceY;

                this.context.fillRect(newOffsetX, newOffsetY, 2, 2);

                // const movementX = event.x - event.offsetX;
                // console.log(movementX);


                const newX = newOffsetX / this.ratio.pixelsPeerUnits;
                const newY = newOffsetY / this.ratio.pixelsPeerUnits;

                console.log(offsetX);
                console.log(offsetY);


                // this.center = {
                //     x: newX,
                //     y: this.center.y
                // };

                // router.navigate({
                //     center: btoa(`${this.center.x}/${this.center.y}`)
                // });
            }
        });

        canvas.addEventListener('mouseup', () => {
            originalMousePosition = undefined;
            canvas.style.cursor = "grab";
        });
    }

    private draw() {
        const minX = this.center.x - this.canvasWidth / 2;
        const minY = this.center.y - this.canvasHeight / 2;
        const maxX = this.center.x + this.canvasWidth / 2;
        const maxY = this.center.y + this.canvasHeight / 2;

        // console.log('ratio : ', this.ratio);
        // console.log('center : ', this.center);
        // console.log("minX : ", minX);
        // console.log("maxX : ", maxX);
        // console.log("minY : ", minY);
        // console.log("maxY : ", maxY);

        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        if (minX < 0 && maxX > 0) {
            this.context.beginPath();
            this.context.strokeStyle = 'red';
            this.context.lineWidth = 1;
            let x: number;
            if (this.center.x >= 0) {
                x = this.center.x;
            } else {
                x = -this.center.x;
            }
            this.context.moveTo(this.getCanvasX(x), 0);
            this.context.lineTo(this.getCanvasX(x), this.canvasHeight);
            this.context.stroke();
        }

        if (minY < 0 && maxY > 0) {
            this.context.beginPath();
            this.context.strokeStyle = 'grey';
            this.context.lineWidth = 1;
            let y: number;
            if (this.center.y >= 0) {
                y = this.center.y;
            } else {
                y = -this.center.y;
            }
            this.context.moveTo(0, this.getCanvasY(y));
            this.context.lineTo(this.canvasWidth, this.getCanvasY(y));
            this.context.stroke();
        }
    }

    private getCanvasX(x: number) {
        return x + (this.canvasWidth / 2) + (x * this.ratio.pixelsPeerUnits);
    }

    private getCanvasY(y: number) {
        return y + (this.canvasHeight / 2) - (y * this.ratio.pixelsPeerUnits);
    }
}