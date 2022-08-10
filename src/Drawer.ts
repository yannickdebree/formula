import { debounceTime, Subject } from 'rxjs';
import { ImpossibleOperationError, UnknowElementError } from './errors';
import { Router } from './router';
import { FORBIDDEN_FUNCTIONS_NAMES } from './utils/constants';
import { isADivisibleNumber } from './utils/numbers';

export class Drawer {
    constructor(router: Router, window: Window) {
        const canvas = window.document.querySelector('canvas');
        if (!canvas) {
            throw new UnknowElementError();
        }

        console.log("Initialisation du Drawer");
        console.log('On souscript au changement de queryParams.');

        const drawingOrder$ = new Subject<void>();
        drawingOrder$.pipe(debounceTime(100)).subscribe(() => {
            console.log("On reçoit l'ordre de dessiner/ redessiner le canvas");
        });

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

                    console.log("On obtient un ratio calculé depuis l'url : ", { unit, pixelsPeerUnits });
                    drawingOrder$.next();
                }
                delete queryParams[key];
            });
            console.log("On obtient les fonctions cryptées à afficher depuis l'URL", queryParams);
            drawingOrder$.next();
        });

        canvas.addEventListener('wheel', () => {
            console.log("On obtient un nouveau ratio du fait de zoomer/ dézoomer");
            console.log('On réactualise l url');
        });

        let mousedown = false;
        canvas.addEventListener('mousedown', () => {
            mousedown = true;
            canvas.style.cursor = "grabbing";
        });
        canvas.addEventListener('mousemove', () => {
            if (mousedown) {
                console.log("On obtient un nouvel intervalle à afficher du fait de se déplacer");
                console.log('On réactualise l url');
            }
        });
        canvas.addEventListener('mouseup', () => {
            mousedown = false;
            canvas.style.cursor = "grab";
        });
    }
}