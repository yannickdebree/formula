import { map } from 'rxjs';
import { ContainerInstance, Service } from 'typedi';
import { OnInit, Router } from '../core';
import { Formula, PixelValue, UnitValue, UnknowElementError } from '../domain';
import { convertXToOffsetX, convertYToOffsetY, FORBIDDEN_FUNCTIONS_NAMES, QueryParamsAnalyzer } from '../utils';
import { getPointsToDrawFromFormulas } from '../utils/formulas';

@Service()
export class Drawer implements OnInit {
    private readonly router: Router;
    private readonly queryParamsAnalyzer: QueryParamsAnalyzer;
    private readonly context: CanvasRenderingContext2D;
    private readonly canvasHeight: PixelValue;
    private readonly canvasWidth: PixelValue;
    private formulas = new Array<Formula>();
    private ratio = {
        unit: 1,
        pixelsPeerUnits: 100
    };
    private center = {
        x: new UnitValue(0),
        y: new UnitValue(0)
    }

    constructor(
        container: ContainerInstance
    ) {
        this.router = container.get(Router);
        this.queryParamsAnalyzer = container.get(QueryParamsAnalyzer);
        const window = container.get(Window);

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
    }

    onInit() {
        this.router.queryParams$.pipe(
            map(queryParams => this.queryParamsAnalyzer.getFiltredQueryParams(queryParams, (key) => !FORBIDDEN_FUNCTIONS_NAMES.includes(key))),
        ).subscribe((options) => {
            this.formulas = [];
            Object.keys(options).forEach(key => {
                this.formulas.push(new Formula(key, options[key]));
            });
            this.draw();
        });
    }

    private async draw() {
        await Promise.all([
            new Promise<void>((resolve) => {
                this.context.clearRect(0, 0, this.canvasWidth.value, this.canvasHeight.value);
                this.drawDefaultMark();
                resolve();
            }),
            getPointsToDrawFromFormulas(this.formulas, this.canvasWidth, this.canvasHeight, this.ratio.pixelsPeerUnits).then(pointsToDraw => {
                pointsToDraw.forEach(({ offsetX, offsetY }) => {
                    this.context.fillRect(offsetX, offsetY, 1, 1);
                });
            })
        ]).catch(() => {
            alert('Operation invalide')
        })
    }

    private drawDefaultMark() {
        const isMinXOutsideCanvas = (this.center.x.value - (this.canvasWidth.value / 2)) < 0;
        const isMinYOutsideCanvas = (this.center.y.value - (this.canvasHeight.value / 2)) < 0;
        const isMaXYOutsideCanvas = (this.center.x.value + (this.canvasWidth.value / 2)) > 0;
        const isMaxYOutsideCanvas = (this.center.y.value + (this.canvasHeight.value / 2)) > 0

        if (isMinXOutsideCanvas && isMaXYOutsideCanvas) {
            this.context.beginPath();
            this.context.strokeStyle = 'red';
            this.context.lineWidth = 1;
            const xInUnits = this.center.x.value >= 0 ? this.center.x : new UnitValue(-this.center.x.value);
            const xInPixels = convertXToOffsetX(xInUnits, this.canvasWidth, this.ratio.pixelsPeerUnits);
            this.context.moveTo(xInPixels.value, 0);
            this.context.lineTo(xInPixels.value, this.canvasHeight.value);
            this.context.stroke();
        }

        if (isMinYOutsideCanvas && isMaxYOutsideCanvas) {
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

        const middleOfUnitsOnYAxe = this.computeMiddleOfUnitsOnAxe(this.canvasHeight);

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
        return Math.ceil(Math.ceil(axeSize.value / this.ratio.pixelsPeerUnits) / 2);
    }
}