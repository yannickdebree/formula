import { debounceTime, filter, startWith, Subject } from 'rxjs';
import { ImpossibleOperationError, PixelValue, UnitValue, UnknowElementError } from '../domain';
import { Encoder } from '../Encoder';
import { Router } from '../router';
import { FORBIDDEN_FUNCTIONS_NAMES } from '../utils/constants';
import { convertXToOffsetX, convertYToOffsetY } from '../utils/conversion';
import { isADivisibleNumber, isANumber } from '../utils/numbers';

export class Drawer {
    private readonly context: CanvasRenderingContext2D;
    private readonly canvasHeight: PixelValue;
    private readonly canvasWidth: PixelValue;
    private ratio = {
        unit: 1,
        pixelsPeerUnits: 100
    };
    private center = {
        x: new UnitValue(0),
        y: new UnitValue(0)
    }

    constructor(router: Router, window: Window, encoder: Encoder) {
        const canvas = window.document.querySelector('canvas');
        if (!canvas) {
            throw new UnknowElementError();
        }

        const context = canvas.getContext("2d");
        if (!context) {
            throw new UnknowElementError();
        }
        this.context = context;
        const canvasHeight = canvas.height = canvas.offsetHeight;
        this.canvasHeight = new PixelValue(canvasHeight);
        const canvasWidth = canvas.width = canvas.offsetWidth;
        this.canvasWidth = new PixelValue(canvasWidth);

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
                    const [numerator, denominator] = encoder.decode(value).split('/');

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
                    const [newX, newY] = encoder.decode(value).split('/');

                    const x = parseFloat(newX);
                    if (!isANumber(x)) {
                        throw new ImpossibleOperationError();
                    }

                    const y = parseFloat(newY);
                    if (!isANumber(y)) {
                        throw new ImpossibleOperationError();
                    }

                    this.center.x = new UnitValue(x);
                    this.center.y = new UnitValue(y);

                    drawingOrder$.next();
                    return;
                }
            });
        });

        canvas.addEventListener('wheel', (event) => {
            const isAZoomInAction = (event as any).wheelDeltaY > 0;

            const increment = 5;
            if (isAZoomInAction) {
                this.ratio.pixelsPeerUnits += increment;
            } else if (this.ratio.pixelsPeerUnits > increment + 1) {
                this.ratio.pixelsPeerUnits -= increment;
            }

            router.navigate({
                ratio: btoa(`${this.ratio.unit}/${this.ratio.pixelsPeerUnits}`)
            });
        });


        // let originalMousePosition: { offsetX: number, offsetY: number } | undefined = undefined;

        // canvas.addEventListener('mousedown', ({ offsetX, offsetY }) => {
        //     originalMousePosition = { offsetX, offsetY };
        //     canvas.style.cursor = "grabbing";
        // });

        // canvas.addEventListener('mousemove', ({ offsetX, offsetY }) => {
        //     if (!!originalMousePosition) {
        //         const differenceX = offsetX - originalMousePosition.offsetX;
        //         const differenceY = offsetY - originalMousePosition.offsetY;

        //         this.context.fillRect(offsetX, offsetY, 2, 2);

        //         const newOffsetX = originalMousePosition.offsetX + -1 * differenceX;
        //         const newOffsetY = originalMousePosition.offsetY + -1 * differenceY;

        //         originalMousePosition = { offsetX, offsetY };

        //         this.context.fillRect(newOffsetX, newOffsetY, 2, 2);

        //         // const newX = newOffsetX / this.ratio.pixelsPeerUnits;
        //         // const newY = newOffsetY / this.ratio.pixelsPeerUnits;

        //         console.clear();
        //         console.log("Souris : ", this.convertOffsetXToX(offsetX));
        //         console.log("Attendu : ", this.convertOffsetXToX(newOffsetX));

        //         this.center = {
        //             x: this.convertOffsetXToX(offsetX),
        //             y: this.center.y
        //         };

        //         router.navigate({
        //             center: btoa(`${this.center.x}/${this.center.y}`)
        //         });
        //     }
        // });

        // canvas.addEventListener('mouseup', () => {
        //     originalMousePosition = undefined;
        //     canvas.style.cursor = "grab";
        // });
    }

    private draw() {
        this.context.clearRect(0, 0, this.canvasWidth.value, this.canvasHeight.value);

        const minX = this.center.x.value - (this.canvasWidth.value / 2);
        const minY = this.center.y.value - (this.canvasHeight.value / 2);
        const maxX = this.center.x.value + (this.canvasWidth.value / 2);
        const maxY = this.center.y.value + (this.canvasHeight.value / 2)

        if (minX < 0 && maxX > 0) {
            this.context.beginPath();
            this.context.strokeStyle = 'red';
            this.context.lineWidth = 1;
            const xInUnits = this.center.x.value >= 0 ? this.center.x : new UnitValue(-this.center.x.value);
            const xInPixels = convertXToOffsetX(xInUnits, this.canvasWidth, this.ratio.pixelsPeerUnits);
            this.context.moveTo(xInPixels.value, 0);
            this.context.lineTo(xInPixels.value, this.canvasHeight.value);
            this.context.stroke();
        }

        if (minY < 0 && maxY > 0) {
            this.context.beginPath();
            this.context.strokeStyle = 'grey';
            this.context.lineWidth = 1;
            const yInUnits = this.center.y.value >= 0 ? this.center.y : new UnitValue(-this.center.y.value);
            const yInPixels = convertYToOffsetY(yInUnits, this.canvasHeight, this.ratio.pixelsPeerUnits);
            this.context.moveTo(0, yInPixels.value);
            this.context.lineTo(this.canvasWidth.value, yInPixels.value);
            this.context.stroke();
        }

        const middleOfUnitsOnXAxe = this.computeMiddleOfUnitsOnAxe(this.canvasWidth);

        for (let x = 0 - middleOfUnitsOnXAxe; x < middleOfUnitsOnXAxe; x = x + this.ratio.unit) {
            this.context.beginPath();
            this.context.strokeStyle = '#000000';
            this.context.font = "12px Arial";
            const offsetX = convertXToOffsetX(new UnitValue(x), this.canvasWidth, this.ratio.pixelsPeerUnits);
            const offsetY = convertYToOffsetY(new UnitValue(0), this.canvasHeight, this.ratio.pixelsPeerUnits);
            this.context.fillText(x.toString(), offsetX.value - 18, offsetY.value - 6);
            this.context.fillRect(
                offsetX.value,
                offsetY.value - 5,
                1,
                10
            );
        }

        const middleOfUnitsOnYAxe = this.computeMiddleOfUnitsOnAxe(this.canvasWidth);

        for (let y = 0 - middleOfUnitsOnYAxe; y < middleOfUnitsOnYAxe; y = y + this.ratio.unit) {
            this.context.beginPath();
            this.context.strokeStyle = '#000000';
            this.context.font = "12px Arial";
            const offsetX = convertXToOffsetX(new UnitValue(0), this.canvasWidth, this.ratio.pixelsPeerUnits);
            const offsetY = convertYToOffsetY(new UnitValue(y), this.canvasHeight, this.ratio.pixelsPeerUnits);
            this.context.fillText(y.toString(), offsetX.value - 18, offsetY.value - 6);
            this.context.fillRect(
                offsetX.value - 5,
                offsetY.value,
                10,
                1
            );
        }
    }

    private computeMiddleOfUnitsOnAxe(axeSize: PixelValue) {
        return parseFloat((axeSize.value / this.ratio.pixelsPeerUnits).toFixed(this.ratio.unit - 1)) / 2;
    }
}